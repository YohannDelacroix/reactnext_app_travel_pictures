import PrivateGallery from "../../components/PrivateGallery";


export default async function PrivateGalleryPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    return (
        <PrivateGallery id={id} />
    );
}