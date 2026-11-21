import { stripe } from "@/lib/stripe";
import type { EventRow } from "./types";

/**
 * Hält Stripe Product + Price pro Konzert synchron. Ein Preis in Stripe ist
 * unveränderbar, Preisänderungen → neuer Price + alter wird archiviert.
 *
 * Aufgerufen aus dem Admin-CRUD immer nach dem DB-Schreib und bekommt die
 * frisch gespeicherte Event-Zeile. Gibt { productId, priceId } zurück, die
 * dann via setEventStripeIds in der DB verankert werden.
 */
export async function syncEventToStripe(
  event: EventRow
): Promise<{ productId: string | null; priceId: string | null }> {
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
    return { productId: event.stripe_product_id, priceId: null };
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
    return { productId, priceId };
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

  // Preisänderung? Dann neuen Price anlegen und alten archivieren.
  let priceId = event.stripe_price_id;
  if (priceId) {
    try {
      const currentPrice = await stripe().prices.retrieve(priceId);
      if (
        currentPrice.unit_amount !== event.price_cents ||
        currentPrice.currency !== "eur" ||
        !currentPrice.active
      ) {
        const newPrice = await stripe().prices.create({
          product: productId,
          currency: "eur",
          unit_amount: event.price_cents
        });
        await stripe()
          .prices.update(priceId, { active: false })
          .catch(() => undefined);
        await stripe()
          .products.update(productId, { default_price: newPrice.id })
          .catch(() => undefined);
        priceId = newPrice.id;
      }
    } catch (err) {
      console.warn("[stripeSync] price check failed, creating new price", err);
      const newPrice = await stripe().prices.create({
        product: productId,
        currency: "eur",
        unit_amount: event.price_cents
      });
      priceId = newPrice.id;
    }
  } else {
    const newPrice = await stripe().prices.create({
      product: productId,
      currency: "eur",
      unit_amount: event.price_cents
    });
    await stripe()
      .products.update(productId, { default_price: newPrice.id })
      .catch(() => undefined);
    priceId = newPrice.id;
  }

  return { productId, priceId };
}
