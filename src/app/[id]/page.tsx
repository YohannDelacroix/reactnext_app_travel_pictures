import CardImage from "@/app/components/CardImage"

export default function PrivateGallery() {
    return (
        <div>
            {/* Welcome and language selection*/}
            <div>
                <h1>Hello #User444</h1>
                <p>Your pictures are ready to be downloaded</p>

                <div>
                    <select>
                        <option>EN</option>
                        <option>FR</option>
                        <option>ES</option>
                        <option>DE</option>
                        <option>IT</option>
                    </select>
                </div>
            </div>

            <form>
                {/* Image Card (render with a map)*/}
                <CardImage 
                    index={1} 
                    price={8.99} 
                    src={"/images/FotoYohannDelacroix.PNG"}
                    title={"Titre de la photo, un titre vraiment très long, interminable en fait"} 
                    resolution={"6000x4000"}
                    description={"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."} />
                
                <button>Proceed to checkout</button>
            </form>

        </div>
    );
}