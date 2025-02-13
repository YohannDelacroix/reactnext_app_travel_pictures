import { parseParameter } from "next/dist/shared/lib/router/utils/route-regex";
import PrivateGallery from "../../components/PrivateGallery";

export default function PrivateGalleryPage({ params }: { params: { id: string } }) {
    
    return (
        <PrivateGallery id={params.id} />
    );
}