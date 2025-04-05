import { db } from '@/../libs/firebaseAdmin';
import { privateGallery } from "../models/privateGallery";


/**
 * Adds a new private gallery to Firestore using a predefined shooting ID.
 * @param privateGallery - The privateGallery object containing all necessary data.
 * @returns The shooting ID or an error message.
 */
export async function addPrivateGallery(privateGallery: privateGallery): Promise<{ id: string; message: string }> {
    try {
        // Ensure the shooting ID is provided
        if (!privateGallery.shootingInfo.id) {
            throw new Error("Missing shooting ID");
        }

        const galleryId = privateGallery.shootingInfo.id;
        const docRef = db.collection('privateGallery').doc(galleryId);

        // Check if a document with the same ID already exists
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            throw new Error("Gallery with this ID already exists");
        }

        // Save the gallery in Firestore
        await docRef.set(privateGallery);

        return { id: galleryId, message: 'New private gallery added' };
    } catch (error) {
        console.error("Error adding gallery:", error);
        throw new Error('Failed to add new private Gallery');
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
 * Updates an existing private gallery in Firestore.
 * @param id - The ID of the gallery to update.
 * @param updatedData - The new data to merge into the gallery.
 * @returns A success message or an error.
 */
export async function updateGallery(id: string, updatedData: Partial<privateGallery>): Promise<{ message: string }> {
    try {
        const docRef = db.collection('privateGallery').doc(id);
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            throw new Error('Gallery not found');
        }

        // Merge the new data with the existing document
        await docRef.update(updatedData);

        return { message: 'Gallery successfully updated' };
    } catch (error) {
        console.error('Error updating gallery:', error);
        throw new Error('Failed to update gallery');
    }
}
