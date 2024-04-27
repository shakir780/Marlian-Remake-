import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_KEY);
export const stripeSession = async (req, res) => {
  const session = await Stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.redirect(303, session.url);
};
