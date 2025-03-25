import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface photoViewerProps {
    fileName: string;
    alt: string;
    width: number;
    height: number;
    sizes?: string;
    className?: string;
}

const PhotoViewer = ({ fileName, alt, width, height, sizes = "", className = "" }: photoViewerProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if(process.env.NEXT_PUBLIC_STATIC_MODE === "false"){
            const fetchSignedUrl = async () => {
                try {
                    const response = await axios.get(`/api/getSignedUrl?fileName=${fileName}`);
                    setImageUrl(response.data.url);
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'URL signée :", error);
                }
            };
    
            fetchSignedUrl();
        }
        else setImageUrl(fileName);
    }, [fileName, process.env.NEXT_PUBLIC_STATIC_MODE]);

    return imageUrl ? <Image    src={imageUrl} 
                                alt={alt}
                                width={width}
                                height={height} 
                                sizes={sizes}
                                className={className} /> : <p>Loading spinner...</p>;
};

export default PhotoViewer;