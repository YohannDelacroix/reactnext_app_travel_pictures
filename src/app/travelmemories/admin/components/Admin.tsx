"use client"
import { useEffect, useState } from "react";
import { privateGallery } from "@/app/models/privateGallery";
import { FaRegTrashAlt } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";


export default function Admin() {
    const [galleries, setGalleries] = useState<privateGallery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("/api/privateGallery")
            .then((res) => res.json())
            .then((data) => {
                setGalleries(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching galleries:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gallery?")) return;

        try {
            const res = await fetch(`/api/privateGallery/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setGalleries((prev) => prev.filter((gallery) => gallery.shootingInfo.id !== id));
            } else {
                console.error("Failed to delete gallery");
            }
        } catch (error) {
            console.error("Error deleting gallery:", error);
        }
    };

    useEffect(() =>{
        galleries.map((gallery) => console.log("id = ", gallery.shootingInfo.id))
    },[galleries])

    if (loading) return <Loading />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin - Private Galleries</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleries.map((gallery, index) => (
                    <div key={`${index}-${gallery.shootingInfo.id}`} className="relative p-4 border rounded-lg shadow">
                        <h2 className="text-lg font-semibold">
                            {gallery.shootingInfo.country} - {gallery.shootingInfo.city}
                        </h2>
                        <p className="text-sm text-gray-500">Shooting ID: {gallery.shootingInfo.id}</p>
                        <p className="text-md mt-2">
                            <strong>{gallery.userInfo.firstName} {gallery.userInfo.lastName}</strong>
                        </p>
                        <p className="text-sm text-gray-600">{gallery.userInfo.email}</p>
                        <p className="text-md font-bold mt-2">Price: ${gallery.unitPrice.toFixed(2)}</p>
                        <button className="absolute right-3 top-0 mt-4 bg-myred p-2 hover:brightness-95" onClick={() => handleDelete(gallery.shootingInfo.id)}>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
