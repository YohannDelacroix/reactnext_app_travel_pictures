import { db } from "@/../libs/firebaseAdmin"; // Firestore instance
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

/**
 * API Route: Generates a unique shooting ID that does not exist in Firebase.
 */
export async function POST() {
    try {
        let shootingId;
        let exists = true;

        while (exists) {
            shootingId = uuidv4(); // Generate a UUID
            const docRef = db.collection("privateGallery").doc(shootingId);
            const docSnapshot = await docRef.get();
            exists = docSnapshot.exists; // Check if it already exists
        }

        return NextResponse.json({ shootingId });
    } catch (error) {
        console.error("Error generating shooting ID:", error);
        return NextResponse.json({ error: "Failed to generate ID" }, { status: 500 });
    }
}
