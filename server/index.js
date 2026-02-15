//For reference: https://stripe.com/docs/payments/checkout/quickstart and https://www.youtube.com/watch?v=tqt9Vo7CXWM

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // import stripe package with it called secret key

const app = express();
const port = 5000;

// --- KEEP THESE TO THE TOP ---
app.use(cors());           // Allows cross-origin requests from your React app
app.use(express.json());   // Parses incoming JSON so req.body is available
// -----------------------------

app.get("/", (req, res) => {
  //define test route
  res.send("Stripe Checkout Server is running...");
});

//Create a POST request route to create Stripe Checkout Session
app.post("/create-stripe-checkout-session", async (req, res) => {
  try {
    const { priceId } = req.body; // Extract priceId from client

    const session = await stripe.checkout.sessions.create({
      mode: "subscription", // Stripe Checkout operates in three distinct modes to handle different transaction types: payment, subscription, and setup
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, //this will redirect to success page
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
