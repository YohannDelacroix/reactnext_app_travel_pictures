import type { Metadata } from "next";
import '@fontsource/poppins';
import "./globals.css";

export const metadata: Metadata = {
    title: "Get Your Travel Pictures",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gradient-to-b from-[#f9f9f9] to-[#f0e4d7] p-global text-[0.9rem]
                                md:text-[1rem]
                                lg:text-[1.2rem]">
                {children}
            </body>
        </html>
    );
}
