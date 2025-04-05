/**
 * @file route.ts
 * @description API routes for handling private gallery operations (GET, PUT, DELETE).
 * @author Yohann Delacroix
 * @date 2025-04-03
 */

import { getGalleryById, updateGallery, deletePrivateGallery } from "@/app/controllers/privateGallery";

/**
 * Handles GET requests to retrieve a private gallery by its ID.
 * @param {Request} req - The request object containing the gallery ID in the URL.
 * @returns {Promise<Response>} - A JSON response containing the gallery data or an error message.
 */
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

/**
 * Handles PUT requests to update an existing private gallery.
 * @param {Request} req - The request object containing the gallery ID in the URL and the updated data in the body.
 * @returns {Promise<Response>} - A JSON response confirming the update or an error message.
 */
export async function PUT(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        console.log("id = ", id)

        if (!id) {
            return Response.json({ error: 'Missing ID' }, { status: 400 });
        }

        const updatedData = await req.json();

        // Appeler la fonction du contrôleur pour mettre à jour la galerie
        const result = await updateGallery(id, updatedData);

        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 });
    }
}

/**
 * Handles DELETE requests to remove a private gallery by its ID.
 * @param {Request} req - The request object containing the gallery ID in the URL.
 * @returns {Promise<Response>} - A JSON response confirming the deletion or an error message.
 */
export async function DELETE(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return Response.json({ error: 'Missing ID' }, { status: 400 });
        }

        // Appel du contrôleur pour supprimer la galerie
        await deletePrivateGallery(id);

        return Response.json({ message: 'Gallery successfully deleted' }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: error instanceof Error ? error.message : "Something went wrong" }, { status: 500 });
    }
}