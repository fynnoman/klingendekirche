import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function stripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "[stripe] STRIPE_SECRET_KEY is not set. Add it in .env.local or your Vercel environment."
    );
  }
  _stripe = new Stripe(key, { apiVersion: "2025-02-24.acacia" as Stripe.LatestApiVersion });
  return _stripe;
}

export const STRIPE_WEBHOOK_SECRET = () => {
  const s = process.env.STRIPE_WEBHOOK_SECRET;
  if (!s) throw new Error("[stripe] STRIPE_WEBHOOK_SECRET is not set.");
  return s;
};
