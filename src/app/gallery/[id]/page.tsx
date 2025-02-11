"use client"
import CardImage from "@/app/gallery/components/CardImage"
import imagesSrc from "@/imageList.json";
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/gallery/components/SideBar";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { setSessionInfo } from "../store/gallerySlice";



export default function PrivateGallery() {
    const parentSrc = parentSrcType.PRIVATE_GALLERY; //Ensure CardImage will work for PrivateGallery uses
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        /**
        * call the database to load the session info (photos, name, country, ...)
        * store the datas in the redux store
        * @param id relative to the photo session with the clients
        */
        const fetchGalleryData = async (id: string) => {
            //const response = await fetch(`/api/gallery/${galleryId}`); 
            //const data = await response.json();
            let data = {
                photos: [],
                shootingInfo: {
                    id: "2354636",
                    modelName: "James Hetfield",
                    country: "Spain",
                    city: "Barcelona"
                }
            }

            if (data) {
                // Met à jour Redux avec les photos et les infos du shooting
                dispatch(setSessionInfo({ photos: data.photos, shootingInfo: data.shootingInfo }));

                // Définir le prix unitaire et maximal
                //const unitPrice = data.unitPrice ?? 10; // Valeur par défaut
                //dispatch(setUnitPrice(unitPrice));
                //dispatch(setMaxPrice(data.photos.length * unitPrice));
            }
        };

        fetchGalleryData("54646"); //Call with a fake id to test
    }, []);


    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Get the best deal and purchase the entire collection!</p>
            <button className="bg-[#B4E1B9] font-bold py-4 text-[3vw]">GET ALL PHOTOS FOR ONLY 21,99€</button>

            {/* Image Card (render with a map)*/}
            {
                imagesSrc.map((image, index) => {
                    return (
                        <CardImage
                            parentSrc={parentSrc}
                            key={index}
                            index={index}
                            price={8.99}
                            src={image}
                            title={"Titre de la photo, un titre vraiment très long, interminable en fait"}
                            resolution={"6000x4000"}
                            description={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."} />
                    )
                }
                )
            }

            <SideBar parentSrc={parentSrc} />
        </form>
    );
}