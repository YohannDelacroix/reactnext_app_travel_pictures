import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const PhotoViewer = ({ fileName }: { fileName: string }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchSignedUrl = async () => {
            try {
                const response = await axios.get(`/api/getSignedUrl?fileName=${fileName}`);
                setImageUrl(response.data.url);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'URL signée :", error);
            }
        };

        fetchSignedUrl();
    }, [fileName]);

    return imageUrl ? <Image    src={imageUrl} 
                                alt="Photo" 
                                width="320"
                                height="180" /> : <p>Chargement...</p>;
};

export default PhotoViewer;