import { NextRequest, NextResponse } from "next/server";
import { db, verifyToken } from "@/../libs/firebaseAdmin";
import admin from "firebase-admin";

// [POST] Add a new user (Auth + Firestore)
export async function POST(req: NextRequest) {
    try {
        // Parse the request body
        const body = await req.json();
        const { email, password, displayName, role } = body;

        // Validate email and password fields
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Prevent creating users with "admin" role
        if (role === "admin") {
            return NextResponse.json({ error: "Creating an admin user is not allowed" }, { status: 403 });
        }

        // Create the user in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
        });

        // Prepare user data for Firestore
        const userDoc = {
            uid: userRecord.uid,
            email,
            displayName: displayName || "",
            role: role,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Save the user in Firestore
        await db.collection("users").doc(userRecord.uid).set(userDoc);

        return NextResponse.json({ message: "User created successfully", user: userDoc }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
