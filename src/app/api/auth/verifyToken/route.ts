import { NextResponse } from "next/server";
import { verifyToken } from "@/../libs/firebaseAdmin"; 

/**
 * Handles the POST request to verify the Firebase authentication token.
 * 
 * This route is designed to receive a token in the request body, verify it using the Firebase Admin SDK, 
 * and return the decoded user data (UID) if the token is valid. If the token is missing or invalid, 
 * it responds with an appropriate error message.
 * 
 * @param req - The incoming HTTP request containing the token in the body.
 * @returns - A JSON response containing either the user's UID (status 200) or an error message 
 *            indicating missing or invalid token (status 401).
 */
export async function POST(req: Request) {
    try {
        const { token } = await req.json(); // Retrieve the sent token

        if (!token) {
            return NextResponse.json({ error: "Token missing" }, { status: 401 });
        }

        const decodedToken = await verifyToken(token); // Firebase verification
        return NextResponse.json({ uid: decodedToken.uid }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}

