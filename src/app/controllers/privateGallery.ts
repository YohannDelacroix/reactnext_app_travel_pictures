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

/**
 * 
 * @returns all the private Galleries
 */
export async function getPrivateGallery(): Promise<privateGallery[]> {
    try {
        const snapshot = await db.collection('privateGallery').get();
        const galleries: privateGallery[] = snapshot.docs.map(doc => doc.data() as privateGallery);
        return galleries;
    } catch (error) {
        console.error('Error fetching galleries:', error);
        throw new Error('Failed to retrieve galleries');
    }
}

/**
 * 
 * @param id a string representing private Gallery's ID
 * @returns the privateGallery retrieved from the database
 */
export async function getGalleryById(id: string) {
    try {
        const docRef = db.collection('privateGallery').doc(id);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            throw new Error('Document not found');
        }

        return docSnapshot.data();
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Give access to error.message
            throw new Error('Error fetching gallery by ID: ' + error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}