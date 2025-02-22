import { db } from '@/../libs/firebaseAdmin.js';
import { addPrivateGallery } from '@/app/controllers/privateGallery';

import { privateGallery } from '@/app/models/privateGallery';

/**
 * 
 * @param req containing a privateGallery object
 * @returns A success or failure message
 */
export async function POST(req: Request): Promise<Response> {
    try {
        const body = await req.json() as privateGallery; //Read the request's body
        if(!body) return Response.json({error: "Missing required fields"}, {status: 400});

        const response = await addPrivateGallery(body);

        // Return a response with the created object's ID
        return Response.json({ message: 'Gallery added', id: response.id }, { status: 200 });
    } catch (error) {
        console.error('Error adding gallery:', error);
        return Response.json({ error: 'Something went wrong' }, { status: 500 });
    }
}