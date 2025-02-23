import { db, verifyToken } from '@/../libs/firebaseAdmin.js';
import { addPrivateGallery, getPrivateGallery } from '@/app/controllers/privateGallery';

import { privateGallery } from '@/app/models/privateGallery';
import { ErrorTypes } from '@/types/errorTypes';

/**
 * 
 * @param req containing a privateGallery object
 * @returns A success or failure message
 */
export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json() as privateGallery; //Read the request's body
        if (!body) return Response.json({ error: "Missing required fields" }, { status: 400 });

        const response = await addPrivateGallery(body);

        // Return a response with the created object's ID
        return Response.json({ message: 'Gallery added', id: response.id }, { status: 200 });
    } catch (error) {
        console.error('Error adding gallery:', error);

        if (error instanceof Error) {
            console.log("error.message = ", error.message)
            // Check for the specific error of an existing gallery
            if (error.message === ErrorTypes.GALLERY_ALREADY_EXISTS) {
                return Response.json({ error: 'Gallery with this ID already exists' }, { status: 400 });
            }
        }

        return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
}


/**
 * @param req containing a token
 * @returns all the private galleries
 */
export async function GET(req: Request): Promise<Response> {
    try {
        // Retrieves the token in the headers
        const token = req.headers.get('Authorization')?.split('Bearer ')[1];

        if (!token) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check the token's authenticity
        await verifyToken(token);

        const galleries = await getPrivateGallery();
        return Response.json(galleries, { status: 200 });
    } catch (error) {
        return Response.json({ error: (error as Error).message }, { status: 500 });
    }
}