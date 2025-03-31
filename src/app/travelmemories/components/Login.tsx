"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/../libs/firebaseConfig"; // Ensure you have Firebase configured
import { DOMAIN_PATH, PATH_UPLOAD_SHOOTING } from "@/constants/paths";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${DOMAIN_PATH}api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                throw new Error("Login failed");
            }

            // Redirect to Upload Shooting
            router.push(PATH_UPLOAD_SHOOTING);
        } catch (err) {
            setError("Wrong email or password");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="p-6 bg-white rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleLogin} className="mt-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-md"
                        required
                    />
                    <button type="submit" className="w-full mt-4 p-2 bg-mygreen text-white rounded-md hover:brightness-95 transition-all">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
