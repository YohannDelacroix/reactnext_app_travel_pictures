import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Get Your Travel Pictures",
    description: "Fill your ID and get your pictures",
};

/**
 * Gallery Layout
 * 
 * @description Contains header relative to PrivateGallery, Cart and payment process, allows language switch
 * 
 */

export default function GalleryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div>
                {/* TODO */}
            </div>
            {children}
        </div>
    );
}