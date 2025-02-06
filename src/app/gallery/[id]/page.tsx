import CardImage from "@/app/gallery/components/CardImage"
import imagesSrc from "@/imageList.json";
import { parentSrcType } from "../types/parentSrcType";
import { FaLongArrowAltRight } from "react-icons/fa";
import SideBar from "@/app/gallery/components/SideBar";

export default function PrivateGallery() {
    const parentSrc = parentSrcType.PRIVATE_GALLERY; //Ensure CardImage will work for PrivateGallery uses

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