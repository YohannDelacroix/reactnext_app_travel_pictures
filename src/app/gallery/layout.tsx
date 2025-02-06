import type { Metadata } from "next";


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
            {/* Welcome and language selection*/}
            <div className="flex flex-col relative text-[3vw] border-b border-solid border-black py-4 mb-5">
                <h1>Hello #User444</h1>
                <p>Your pictures are ready to be downloaded</p>

                <div className="absolute right-0 top-0">
                    <select>
                        <option>EN</option>
                        <option>FR</option>
                        <option>ES</option>
                        <option>DE</option>
                        <option>IT</option>
                    </select>
                </div>
            </div>
            {children}
        </div>
    );
}