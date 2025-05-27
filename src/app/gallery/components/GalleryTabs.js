    "use client";

    import { useState, useEffect } from "react";
    import { getAuth } from "firebase/auth"; // firebase client SDK, pastikan sudah setup

    export default function GalleryTabs({ activeTab, setActiveTab, isAdmin }) {
    const [galleryData, setGalleryData] = useState({});
    const [previewImage, setPreviewImage] = useState(null);

    // Dapatkan token Firebase untuk Authorization header
    const getIdToken = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return null;
        return await user.getIdToken();
    };

    const fetchGallery = async () => {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setGalleryData(data);
    };

    useEffect(() => {
        fetchGallery();
    }, []);

    const handleAddImage = async () => {
        const newImage = "/image/food/food_new.jpg"; // contoh image url

        const token = await getIdToken();
        if (!token) return alert("You must be logged in!");

        const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tab: activeTab, image: newImage }),
        });

        if (res.ok) {
        fetchGallery();
        } else {
        const err = await res.json();
        alert(err.error || "Failed to add image");
        }
    };

    // Note: untuk hapus, butuh id bukan index
    const handleDeleteImage = async (id) => {
        const token = await getIdToken();
        if (!token) return alert("You must be logged in!");

        const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
        });

        if (res.ok) {
        fetchGallery();
        } else {
        const err = await res.json();
        alert(err.error || "Failed to delete image");
        }
    };

    return (
        <>
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
            {["food", "people", "other"].map((tab) => (
            <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold uppercase transition ${
                activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-black border border-black"
                }`}
            >
                {tab}
            </button>
            ))}
        </div>

        {/* Tombol tambah gambar (admin) */}
        {isAdmin && (
            <div className="flex justify-center mb-6">
            <button
                onClick={handleAddImage}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
                Tambah Gambar
            </button>
            </div>
        )}

        {/* Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Sekarang galleryData[activeTab] adalah array objek {id, image_url} */}
            {galleryData[activeTab]?.map(({ id, image_url }) => (
            <div
                key={id}
                className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => setPreviewImage(image_url)}
            >
                <img
                src={image_url}
                alt={`${activeTab} image`}
                className="absolute inset-0 w-full h-full object-cover"
                />
                {isAdmin && (
                <button
                    onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(id);
                    }}
                    className="absolute top-2 right-2 bg-red-600 bg-opacity-80 text-white px-2 py-1 rounded-md text-xs hover:bg-red-700 transition"
                    aria-label="Hapus Gambar"
                >
                    &times;
                </button>
                )}
            </div>
            ))}
        </div>

        {/* Modal Preview */}
        {previewImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative max-w-3xl w-full px-4">
                <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 text-white text-3xl font-bold z-50"
                >
                &times;
                </button>
                <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded-lg object-contain max-h-[90vh]"
                />
            </div>
            </div>
        )}
        </>
    );
    }
