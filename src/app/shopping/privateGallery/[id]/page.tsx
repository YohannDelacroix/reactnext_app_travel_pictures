"use client"
import { parseParameter } from "next/dist/shared/lib/router/utils/route-regex";
import PrivateGallery from "../../components/PrivateGallery";
import { useSearchParams } from "next/navigation";

export default function PrivateGalleryPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') ?? "";

    return (
        <PrivateGallery id={id} />
    );
}