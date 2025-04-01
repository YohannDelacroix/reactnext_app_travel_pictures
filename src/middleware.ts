import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware that checks for the presence and validity of an authentication token in cookies.
 * 
 * This middleware intercepts requests to protected routes, checks if the request contains a valid
 * authentication token stored in cookies. If the token is missing or invalid, the user is redirected
 * to the login page. If the token is valid, the user is allowed to proceed with the request.
 * 
 * @param req - The incoming request object containing the cookies to check for the token.
 * @returns - A NextResponse object either allowing the request to proceed (status 200) 
 *            or redirecting the user to the login page (status 302) if the token is missing or invalid.
 */
export async function middleware(req: NextRequest) {
    console.log("Middleware is running...");
    const token = req.cookies.get("token")?.value;

    

    if (!token) {
        console.log("Token missing");
        return NextResponse.redirect(new URL("/travelmemories/login/", req.url)); // Redirect if no token found
    }

    try {
        // Verify the token by calling the API Route
        const response = await fetch(new URL("/api/auth/verifyToken", req.url), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }), // Send token to verify API route
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        return NextResponse.next(); // Allow the user to proceed if the token is valid
    } catch (error) {
        console.error("Authentication error:", (error as Error).message); // Log any errors
        return NextResponse.redirect(new URL("/travelmemories/login/", req.url)); // Redirect on error
    }
}

// 🔹 Define the protected routes
export const config = {
    matcher: [
        "/travelmemories/uploadShooting/:path*", 
        "/api/privateGallery", 
        "/api/uploadPhotos"   
    ] // Apply middleware to these routes
};
