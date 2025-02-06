import Link from "next/link";

export default function Home() {
    return (
        <div>
            <p><Link href="gallery/1">Navigate to the private Gallery!</Link></p>
        </div>
    );
}
