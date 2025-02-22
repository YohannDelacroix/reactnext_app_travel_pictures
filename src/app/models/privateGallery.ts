import { Photo, ShootingInfo, UserInfo } from '../travelmemories/types/galleryTypes';

export interface privateGallery {
    photos: Photo[];
    shootingInfo: ShootingInfo;
    unitPrice: number;
    userInfo: UserInfo;
}