/**
 * @file create-payment-intent.ts
 * @author Yohann Delacroix
 * @date 2025-04-08
 * 
 * @description
 * This file creates a payment intent with Stripe. It handles incoming requests to create
 * a payment intent, processes the amount and currency, and returns the client secret for the payment.
 * 
 * The function uses the Stripe API to create a payment intent and send back the client secret for frontend use.
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
 * This function creates a payment intent with the given amount and currency. It handles
 * incoming requests, processes the data, and returns the client secret needed for the frontend.
 * 
 * @param {Request} req - The incoming HTTP request containing the amount and currency for the payment intent
 * @returns {NextResponse} A JSON response containing the client secret for the payment intent, or an error message
 */
export async function POST(req: Request) {
    try {
        // Parse the incoming JSON data to get the amount and currency
        const { amount, currency } = await req.json();

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method_types: ["card"], // Specify payment method as card
        });

        // Return the client secret for the frontend to use
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        // If an error occurs, return the error message
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
