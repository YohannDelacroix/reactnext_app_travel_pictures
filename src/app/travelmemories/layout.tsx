"use client"
import { Provider } from "react-redux";
import store, { persistor } from "./store/store"
import GalleryHeader from "./components/GalleryHeader/GalleryHeader";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { PersistGate } from "redux-persist/integration/react";


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
            <PersistGate loading={null} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
            <div className="">
                {/* Welcome and language selection*/}
                <GalleryHeader /> 
                {children}
            </div>
            </I18nextProvider>
            </PersistGate>
        </Provider>
    );
}