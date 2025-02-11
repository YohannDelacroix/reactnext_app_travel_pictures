"use client"
import type { Metadata } from "next";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./store/store"
import GalleryHeader from "./components/GalleryHeader";


/**export const metadata: Metadata = {
    title: "Get Your Travel Pictures",
    description: "Fill your ID and get your pictures",
};*/

/**
 * Gallery Layout
 * 
 * @description Visible part on the pages gallery, cart and payment
 * 
 */

export default function GalleryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider store={store}>
            <div>
                {/* Welcome and language selection*/}
                <GalleryHeader /> 
                {children}
            </div>
        </Provider>
    );
}