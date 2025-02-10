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
            <body className="p-global">
                {children}
            </body>
        </html>
    );
}
