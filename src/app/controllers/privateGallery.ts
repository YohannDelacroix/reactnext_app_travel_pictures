import { db } from '@/../libs/firebaseAdmin';
import { privateGallery } from "../models/privateGallery";


/**
 * 
 * @param privateGallery a privateGallery to add in the cloud firestore 
 * @returns an ID or an error
 */
export async function addPrivateGallery(privateGallery: privateGallery): Promise<{ id: string; message: string }> {
    try {
        const newGalleryRef = await db.collection('privateGallery').add(privateGallery);
        return { id: newGalleryRef.id, message: 'New private gallery added' };
    } catch (error) {
        console.error('Error adding gallery:', error);
        throw new Error('Failed to add gallery');
    }
}