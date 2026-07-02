import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const History = () => {
    const { backendUrl, token } = useContext(AppContext);

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(
                backendUrl + "/api/image/history",
                {
                    headers: { token }
                }
            );

            if (data.success) {
                setImages(data.images);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchImages();
    }, [token]);

    return (
        <div className="min-h-screen py-10 px-4 sm:px-10">

            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                Your Image History
            </h1>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-300">
                    Loading history...
                </p>
            ) : images.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">
                    No images generated yet.
                </p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img) => (
                        <div
                            key={img._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 transition-colors"
                        >
                            <img
                                src={img.imageUrl}
                                alt={img.prompt}
                                className="rounded-lg mb-4 w-full object-cover"
                            />

                            <p className="font-semibold text-gray-800 dark:text-white">
                                {img.prompt}
                            </p>

                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                                {new Date(img.createdAt).toLocaleString()}
                            </p>

                            <a
                                href={img.imageUrl}
                                download={`image-${img._id}.png`}
                                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;