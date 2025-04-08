/**
 * @file stripe-webhook.ts
 * @author Yohann Delacroix
 * @date 2025-04-08
 * 
 * @description
 * This file handles incoming webhook events from Stripe, verifies the signature,
 * and processes different types of events like payment success, failure, and completion.
 * 
 * The function listens for Stripe events and logs the event details accordingly.
 */

import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize the Stripe object with your secret key and API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-03-31.basil", // Specify the Stripe API version
});

/**
 * @function POST
 * @description
 * Webhook handler for Stripe events. This function processes incoming events from Stripe,
 * verifies the signature, and logs the results based on event type.
 * 
 * @param {Request} req - The incoming HTTP request containing the event data from Stripe
 * @returns {NextResponse} A JSON response indicating that the event was received successfully
 */
export async function POST(req: Request) {
    // Extract the Stripe signature from the request headers
    const sig = req.headers.get("stripe-signature")!;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!; // The secret for webhook signature validation

    let event;

    try {
        // Important: Use `.text()` instead of `.json()` to read the raw body for Stripe event verification
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret); // Verify the event with the signature
    } catch (err: any) {
        // If verification fails, log the error and return a 400 response
        console.error("Webhook Error:", err.message);
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    // Handle different types of events
    switch (event.type) {
        case "payment_intent.succeeded":
            console.log("Payment succeeded:", event.data.object.id);
            break;

        case "payment_intent.payment_failed":
            console.log("Payment failed:", event.data.object.id);
            break;

        case "checkout.session.completed":
            console.log("Payment completed:", event.data.object.id);
            break;

        default:
            // If an event type is not handled, log it as unrecognized
            console.log("Unhandled event:", event.type);
    }

    // Respond with a confirmation that the event was received
    return NextResponse.json({ received: true });
}
