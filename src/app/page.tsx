import Link from "next/link";
import { PATH_CART, PATH_PRIVATE_GALLERY } from "@/constants/paths"

export default function Home() {
    return (
        <div>
            <p><Link href={`${PATH_PRIVATE_GALLERY}${1}`}>Navigate to the private Gallery!</Link></p>
            <p><Link href={PATH_CART}>GO TO CART</Link></p>
        </div>
    );
}
