/**
 * @file galleryTypes.ts
 * @description Declares interfaces used for data management on the client side.
 */

/**
 * Represents a photo in the gallery.
 */
export interface Photo {
    id: string;            
    title?: string;        
    resolution?: string;   // Optional resolution of the photo (e.g., "1920x1080")
    description?: string;  
    price?: number;
    src: string;           // Source URL of the photo
}

/**
 * Contains information about the photo shoot.
 */
export interface ShootingInfo {
    id: string;           
    modelName: string;    // Name of the model in the shoot
    country: string;      
    city: string;         
}

/**
 * Represents user information.
 */
export interface UserInfo {
    lastName: string;     
    firstName: string; 
    email: string;  
}

/**
 * Represents the session information, including photos and shooting details.
 */
export interface sessionInfo {
    photos: Photo[];                // Array of photos in the session
    shootingInfo: ShootingInfo;     // Details of the photo shoot
}
