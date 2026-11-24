import { stripe } from "@/lib/stripe";
import type { EventRow } from "./types";

/**
 * Hält Stripe Product + Prices (regulär und optional ermäßigt) pro Konzert
 * synchron. Ein Preis in Stripe ist unveränderbar, Preisänderungen → neuer
 * Price + alter wird archiviert.
 *
 * Aufgerufen aus dem Admin-CRUD immer nach dem DB-Schreib und bekommt die
 * frisch gespeicherte Event-Zeile. Gibt die Stripe-IDs zurück, die dann via
 * setEventStripeIds in der DB verankert werden.
 */
export async function syncEventToStripe(
  event: EventRow
): Promise<{
  productId: string | null;
  priceId: string | null;
  priceReducedId: string | null;
}> {
  const hasPricing = event.price_cents > 0 && !event.archived;

  // Fall 1: Event hat keinen Verkauf und soll archiviert werden
  if (!hasPricing) {
    if (event.stripe_product_id) {
      try {
        await stripe().products.update(event.stripe_product_id, {
          active: false
        });
      } catch (err) {
        console.warn("[stripeSync] archive product failed", err);
      }
    }
    return {
      productId: event.stripe_product_id,
      priceId: null,
      priceReducedId: null
    };
  }

  const name = `Konzertkarte: ${event.title_de}`;
  const description =
    `${event.date}${event.time ? " · " + event.time : ""} · ${event.venue_de}`;
  const images = event.image_url ? [event.image_url] : undefined;
  const metadata = { event_id: event.id, event_date: event.date };

  // Fall 2: Noch kein Product in Stripe → neu anlegen
  let productId = event.stripe_product_id;
  if (!productId) {
    const product = await stripe().products.create({
      name,
      description,
      images,
      metadata,
      default_price_data: {
        currency: "eur",
        unit_amount: event.price_cents
      }
    });
    productId = product.id;
    const priceId =
      typeof product.default_price === "string"
        ? product.default_price
        : (product.default_price?.id ?? null);
    const priceReducedId = await ensureReducedPrice(productId, null, event);
    return { productId, priceId, priceReducedId };
  }

  // Fall 3: Product existiert → Metadaten aktualisieren
  try {
    await stripe().products.update(productId, {
      active: true,
      name,
      description,
      images,
      metadata
    });
  } catch (err) {
    console.warn("[stripeSync] update product failed", err);
  }

  const priceId = await ensurePrice(
    productId,
    event.stripe_price_id,
    event.price_cents,
    { setAsDefault: true }
  );
  const priceReducedId = await ensureReducedPrice(
    productId,
    event.stripe_price_reduced_id,
    event
  );

  return { productId, priceId, priceReducedId };
}

async function ensurePrice(
  productId: string,
  existingPriceId: string | null,
  unitAmount: number,
  opts: { setAsDefault?: boolean } = {}
): Promise<string> {
  if (existingPriceId) {
    try {
      const currentPrice = await stripe().prices.retrieve(existingPriceId);
      if (
        currentPrice.unit_amount === unitAmount &&
        currentPrice.currency === "eur" &&
        currentPrice.active
      ) {
        return existingPriceId;
      }
      const newPrice = await stripe().prices.create({
        product: productId,
        currency: "eur",
        unit_amount: unitAmount
      });
      await stripe()
        .prices.update(existingPriceId, { active: false })
        .catch(() => undefined);
      if (opts.setAsDefault) {
        await stripe()
          .products.update(productId, { default_price: newPrice.id })
          .catch(() => undefined);
      }
      return newPrice.id;
    } catch (err) {
      console.warn("[stripeSync] price check failed, creating new price", err);
      const newPrice = await stripe().prices.create({
        product: productId,
        currency: "eur",
        unit_amount: unitAmount
      });
      if (opts.setAsDefault) {
        await stripe()
          .products.update(productId, { default_price: newPrice.id })
          .catch(() => undefined);
      }
      return newPrice.id;
    }
  }
  const newPrice = await stripe().prices.create({
    product: productId,
    currency: "eur",
    unit_amount: unitAmount
  });
  if (opts.setAsDefault) {
    await stripe()
      .products.update(productId, { default_price: newPrice.id })
      .catch(() => undefined);
  }
  return newPrice.id;
}

async function ensureReducedPrice(
  productId: string,
  existingReducedPriceId: string | null,
  event: EventRow
): Promise<string | null> {
  // Kein ermäßigter Preis gesetzt → bestehenden ermäßigten Price archivieren
  if (!event.price_reduced_cents || event.price_reduced_cents <= 0) {
    if (existingReducedPriceId) {
      await stripe()
        .prices.update(existingReducedPriceId, { active: false })
        .catch(() => undefined);
    }
    return null;
  }
  return ensurePrice(productId, existingReducedPriceId, event.price_reduced_cents);
}
