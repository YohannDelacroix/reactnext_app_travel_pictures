import CardImage from "@/app/components/CardImage"
import imagesSrc from "@/imageList.json";
import { parentSrcForCardImageType } from "../../types/parentSrcForCardImageType";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function PrivateGallery() {
    const parentSrcForCardImage = parentSrcForCardImageType.PRIVATE_GALLERY; //Ensure CardImage will work for PrivateGallery uses

    return (
        <form className="flex flex-col gap-y-2 text-[3vw]">
            <p className="text-center">Get the best deal and purchase the entire collection!</p>
            <button className="bg-[#B4E1B9] font-bold py-4 text-[3vw]">GET ALL PHOTOS FOR ONLY 21,99€</button>

            {/* Image Card (render with a map)*/}
            {
                imagesSrc.map((image, index) => {
                    return (
                        <CardImage
                            parentSrc={parentSrcForCardImage}
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
            <div className="flex flex-col gap-y-1 p-4 text-[3vw] sticky bottom-0 bg-black bg-opacity-50 text-[#f0e4d7]">
                <p>Congratulations! You saved <span className="text-[#B4E1B9] text-[4vw] font-bold">3€</span> on your order!</p>
                <div className="flex justify-between items-end">
                    <span>Total before discount:</span>
                    <span className="leading-[3vw] line-through text-red-500">18.99€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Total:</span>
                    <span className="text-[#B4E1B9] text-[4vw] font-bold">15,99€</span>
                </div>
                <button className="flex justify-center items-center gap-x-2 bg-[#B4E1B9] py-2 text-black">
                    <span>GO TO CART</span><FaLongArrowAltRight /></button>
            </div>

        </form>
    );
}