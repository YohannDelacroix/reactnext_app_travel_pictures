import imagesSrc from "@/imageList.json";
import CardImage from "@/app/gallery/components/CardImage";
import { parentSrcType } from "../types/parentSrcType";
import SideBar from "@/app/gallery/components/SideBar";

/**
 * Gallery Cart
 * 
 * Use Cart reusable component
 * 
 */

export default function Cart() {
    const parentSrc = parentSrcType.CART; //Ensure CardImage will work for PrivateGallery uses

    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Review your selected photos and complete your order.</p>
            <p className="text-center">⏳ You can modify your selection before checkout.</p>



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
