"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"; // Pastikan Firebase client SDK sudah di-setup

export default function GalleryTabs({ activeTab, setActiveTab, isAdmin }) {
  const [galleryData, setGalleryData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  // Gambar default per tab
  const defaultGallery = {
    food: [
      { id: "default-food-1", image_url: "/image/food/food1.jpg" },
      { id: "default-food-2", image_url: "/image/food/food2.jpg" },
      { id: "default-food-3", image_url: "/image/food/food3.jpg" },
      { id: "default-food-4", image_url: "/image/food/food4.jpg" },
      { id: "default-food-5", image_url: "/image/food/food5.jpg" },
      { id: "default-food-6", image_url: "/image/food/food6.jpg" },
      { id: "default-food-7", image_url: "/image/food/food7.jpg" },
      { id: "default-food-8", image_url: "/image/food/food8.jpg" },
      { id: "default-food-9", image_url: "/image/food/food9.jpg" },
      { id: "default-food-10", image_url: "/image/food/food10.jpg" },
      { id: "default-food-11", image_url: "/image/food/food11.jpg" },
      { id: "default-food-12", image_url: "/image/food/food12.jpg" },
      { id: "default-food-13", image_url: "/image/food/food13.jpg" },
      { id: "default-food-14", image_url: "/image/food/food14.jpg" },
      { id: "default-food-15", image_url: "/image/food/food15.jpg" },
      { id: "default-food-16", image_url: "/image/food/food16.jpg" },
      { id: "default-food-17", image_url: "/image/food/food17.jpg" },
      { id: "default-food-18", image_url: "/image/food/food18.jpg" },
      { id: "default-food-19", image_url: "/image/food/food19.jpg" },
    ],
    people: [
      { id: "default-people-1", image_url: "/image/people/people1.jpg" },
      { id: "default-people-2", image_url: "/image/people/people2.jpg" },
      { id: "default-people-3", image_url: "/image/people/people3.jpg" },
      { id: "default-people-4", image_url: "/image/people/people4.jpg" },
      { id: "default-people-5", image_url: "/image/people/people5.jpg" },
      { id: "default-people-6", image_url: "/image/people/people6.jpg" },
      { id: "default-people-7", image_url: "/image/people/people7.jpg" },
    ],
    other: [{ id: "default-other-1", image_url: "/image/other/other1.jpg" }],
  };

  const getIdToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryData(data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAddImage = async () => {
    if (galleryData[activeTab]?.length >= 6) {
      return alert("Maksimal 6 gambar per kategori.");
    }

    const newImage = "/image/food/food_new.jpg"; // Ganti dengan image upload sebenarnya

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

  // Pakai data dari galleryData jika ada, kalau tidak pakai defaultGallery
  const imagesToShow =
    galleryData[activeTab] && galleryData[activeTab].length > 0
      ? galleryData[activeTab]
      : defaultGallery[activeTab] || [];

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
        {imagesToShow.map(({ id, image_url }) => (
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
            {isAdmin &&
              galleryData[activeTab]?.some((img) => img.id === id) && (
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
