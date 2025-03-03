require("dotenv").config();
console.log("Environment Variables Loaded:", process.env); // Log all environment variables

const express = require("express");
const path = require("path"); // Import the path module

const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("Environment Variables:", process.env); // Log all environment variables
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY); // Log the Stripe Secret Key


const app = express();

// ✅ Fix CORS issue
app.use(cors({
    origin: process.env.FRONTEND_URL, // Use the URL from the environment variable
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Backend is running and connected to Stripe!");
});

// ✅ Create a Stripe Checkout session API route
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, currency = "gbp" } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({ error: "Invalid items array" });
        }

        // Log the incoming items to debug
        console.log("Received items:", items);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map(item => ({
                price_data: {
                    currency,
                    product_data: { name: item.name },
                    unit_amount: item.amount, // Amount in pence
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        res.json({ url: session.url }); // Send session URL for redirect
    } catch (error) {
        console.error("Stripe Error:", error);
        console.log("Request Body:", req.body); // Log the request body for debugging

        res.status(500).json({ error: "Failed to create checkout session" });
    }
});

app.use(express.static(path.join(__dirname, 'assets'))); // Serve static files from the assets directory



// ✅ Start the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Loaded" : "Not Loaded");
