import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/../libs/firebaseConfig"; // Import du client Firebase

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Required email and password" }, { status: 400 });
        }

        // Connexion via Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken(); // Récupère le token d'identification

        // Définir un cookie HttpOnly pour sécuriser le token
        const response = NextResponse.json({ message: "Connection successful" });
        response.headers.set(
            "Set-Cookie",
            `token=${idToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
        );

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Wrong identifiers" }, { status: 401 });
    }
}
