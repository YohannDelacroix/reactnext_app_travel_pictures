import PrivateGallery from "../../components/PrivateGallery";
type Params = Promise<{ id: string }>;

export default async function PrivateGalleryPage({ params }: { params: Params }) {
    const { id } = await params;
    return (
        <PrivateGallery id={id} />
    );
}