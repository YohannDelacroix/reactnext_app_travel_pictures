import Link from "next/link";

export default function Home() {
    return (
        <div>
            <p><Link href="/shopping/privateGallery/1">Navigate to the private Gallery!</Link></p>
            <p><Link href="/shopping/cart">GO TO CART</Link></p>
        </div>
    );
}
