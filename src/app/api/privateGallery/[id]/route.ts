import { getGalleryById } from "@/app/controllers/privateGallery";

export async function GET(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return Response.json({ error: 'Missing ID' }, { status: 400 });
        }

        // Appeler la fonction du controller pour récupérer la galerie par ID
        const gallery = await getGalleryById(id);

        // Retourner les données du document
        return Response.json(gallery, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 });
    }
}