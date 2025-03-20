import { db } from '@/../libs/firebaseAdmin';
import { privateGallery } from "../models/privateGallery";
<<<<<<< HEAD
import { ErrorTypes } from '@/types/errorTypes';
=======
>>>>>>> 13dc3c9 (privateGallery (POST) added :)


/**
 * 
 * @param privateGallery a privateGallery to add in the cloud firestore 
 * @returns an ID or an error
 */
export async function addPrivateGalleryOLD(privateGallery: privateGallery): Promise<{ id: string; message: string }> {
    try {
<<<<<<< HEAD
        //Retrieves the unique ID
        const galleryId = privateGallery.shootingInfo.id;

        //Check there is no other document with the same ID
        const docRef = db.collection('privateGallery').doc(galleryId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
            throw new Error(ErrorTypes.GALLERY_ALREADY_EXISTS);
        }

        await docRef.set(privateGallery);
        //const newGalleryRef = await db.collection('privateGallery').add(privateGallery);
        return { id: galleryId, message: 'New private gallery added' };
    } catch (error) {
        console.error('Error adding gallery:', error);
        throw error;
    }
}

/**
 * 
 * @param privateGallery a privateGallery to add in the cloud firestore 
 * @returns an ID or an error
 */
export async function addPrivateGalleryOLDD(privateGallery: privateGallery): Promise<{ id: string; message: string }> {
    try {
        // Create a new document reference with an auto-generated ID
        const newGalleryRef = db.collection('privateGallery').doc();
        const generatedId = newGalleryRef.id; // Retrieve the generated ID

        // Assign the generated ID to shootingInfo.id
        privateGallery.shootingInfo.id = generatedId;

        // Save the privateGallery with the updated ID
        await newGalleryRef.set(privateGallery);

        return { id: generatedId, message: 'New private gallery added' };
    } catch (error) {
        console.error('Error adding gallery:', error);
        throw error;
    }
}

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
=======
        const newGalleryRef = await db.collection('privateGallery').add(privateGallery);
        return { id: newGalleryRef.id, message: 'New private gallery added' };
    } catch (error) {
        console.error('Error adding gallery:', error);
        throw new Error('Failed to add gallery');
>>>>>>> 13dc3c9 (privateGallery (POST) added :)
    }
}