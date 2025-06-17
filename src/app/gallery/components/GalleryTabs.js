"use client";

import { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

const PLACEHOLDER_IMG = "/placeholder.png"; // Pastikan ada di /public

export default function GalleryTabs({ activeTab, setActiveTab, isAdmin }) {
  const [galleryData, setGalleryData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [fabOpen, setFabOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // State untuk upload foto
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  // Dummy default gallery untuk filler minimal 6 gambar
  const defaultGallery = {
    food: [
      { id: "default-food-1", image_url: "/image/food/food1.jpg" },
      { id: "default-food-2", image_url: "/image/food/food2.jpg" },
      { id: "default-food-3", image_url: "/image/food/food3.jpg" },
      { id: "default-food-4", image_url: "/image/food/food4.jpg" },
      { id: "default-food-5", image_url: "/image/food/food5.jpg" },
      { id: "default-food-6", image_url: "/image/food/food6.jpg" },
    ],
    people: [
      { id: "default-people-1", image_url: "/image/people/people1.jpg" },
      { id: "default-people-2", image_url: "/image/people/people2.jpg" },
      { id: "default-people-3", image_url: "/image/people/people3.jpg" },
      { id: "default-people-4", image_url: "/image/people/people4.jpg" },
      { id: "default-people-5", image_url: "/image/people/people5.jpg" },
      { id: "default-people-6", image_url: "/image/people/people6.jpg" },
    ],
    other: [
      { id: "default-other-1", image_url: "/image/other/other1.jpg" },
      { id: "default-other-2", image_url: "/image/other/other2.jpg" },
      { id: "default-other-3", image_url: "/image/other/other3.jpg" },
      { id: "default-other-4", image_url: "/image/other/other4.jpg" },
      { id: "default-other-5", image_url: "/image/other/other5.jpg" },
      { id: "default-other-6", image_url: "/image/other/other6.jpg" },
    ],
  };

  // Get Firebase Auth token
  const getIdToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  };

  // Fetch gallery data dari backend
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

  // Handler show form upload
  const openAddMenu = () => {
    setFabOpen(false);
    setShowAddMenu(true);
    setImageFile(null);
    setImagePreview(null);
  };

  // Handle file change upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  // Submit upload
  const handleSubmitMenu = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }
    const token = await getIdToken();
    if (!token) {
      alert("You must be logged in!");
      return;
    }

    // Upload ke API upload
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("tab", activeTab);

    const uploadRes = await fetch("/api/gallery/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadRes.ok) {
      return alert(uploadData.error || "Upload gagal");
    }

    setShowAddMenu(false);
    setImageFile(null);
    setImagePreview(null);
    fetchGallery();
  };

  // Handler hapus gambar
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

  // ===== Logika Menampilkan Gallery =====
  const imagesFromApi = galleryData[activeTab] || [];
  const defaultImages = defaultGallery[activeTab] || [];
  const imagesToShow =
    imagesFromApi.length >= 6
      ? imagesFromApi
      : [
          ...imagesFromApi,
          ...defaultImages.filter(
            (def) => !imagesFromApi.some((img) => img.id === def.id)
          ),
        ].slice(0, 6);

  // Handle img error (ganti dengan placeholder)
  const onImgError = (e) => {
    e.target.onerror = null;
    e.target.src = PLACEHOLDER_IMG;
  };

  return (
    <>
      {/* =========== FORM UPLOAD GAMBAR ADMIN =========== */}
      {showAddMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmitMenu}
            className="w-full max-w-lg p-8 bg-[#181818] rounded-2xl border border-gray-700 shadow-xl relative flex flex-col gap-7"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowAddMenu(false)}
              className="absolute top-4 right-6 text-white text-3xl font-bold z-50"
              aria-label="Tutup"
            >
              &times;
            </button>
            <h2 className="text-3xl text-center font-serif text-[#E5D4B6] tracking-wide mb-6">
              ADMIN
            </h2>
            <div className="text-[#E5D4B6] text-lg mb-4 font-serif tracking-widest text-center">
              UPLOAD FOTO MENU
            </div>
            {/* Image Upload Only */}
            <div className="flex flex-col items-center justify-center bg-[#212121] p-4 rounded-xl border border-gray-700 min-h-[220px]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-w-xs h-40 object-cover rounded mb-4"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-40 mb-4">
                  <svg
                    className="w-16 h-16 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect width="24" height="24" fill="none" />
                    <path
                      d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
                      stroke="#888"
                      strokeWidth="2"
                    />
                    <path d="M8 11l2 2.5 3-4 4 6.5" stroke="#888" strokeWidth="2" />
                  </svg>
                </div>
              )}
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <span className="inline-block bg-gray-700 text-[#E5D4B6] px-6 py-2 rounded-lg cursor-pointer font-semibold tracking-widest hover:bg-gray-600 transition">
                  {imagePreview ? "Change Image" : "Upload Image"}
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-[#E5D4B6] text-[#1a1a1a] font-bold py-3 rounded-lg text-xl tracking-wide hover:bg-[#d2bc97] transition"
            >
              Save
            </button>
          </form>
        </div>
      )}

      {/* =========== GALLERY =========== */}
      <div
        className={showAddMenu ? "pointer-events-none blur-sm select-none" : ""}
      >
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {["food", "people", "other"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setDeleteMode(false);
              }}
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
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {imagesToShow.map(({ id, image_url }) => (
            <div
              key={id}
              className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-lg transition bg-[#191919]"
            >
              <img
                src={image_url}
                alt={`${activeTab} image`}
                className="absolute inset-0 w-full h-full object-cover"
                onError={onImgError}
              />
              {/* Tombol hapus muncul saat deleteMode */}
              {isAdmin && deleteMode && (
                <button
                  onClick={() => handleDeleteImage(id)}
                  className="absolute top-2 right-2 bg-red-700 bg-opacity-90 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold shadow hover:bg-red-900 transition"
                  aria-label="Hapus Gambar"
                  style={{
                    zIndex: 2,
                  }}
                >
                  &minus;
                </button>
              )}
              {/* Klik gambar preview hanya jika bukan deleteMode */}
              {!deleteMode && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setPreviewImage(image_url)}
                  title="Klik untuk preview"
                  style={{ zIndex: 1 }}
                />
              )}
            </div>
          ))}
        </div>
        {/* FAB */}
        {isAdmin && (
          <div>
            {fabOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-10 z-40"
                onClick={() => setFabOpen(false)}
              />
            )}
            <div
              className="fixed z-50 flex flex-col items-end gap-2"
              style={{
                right: "2rem",
                bottom: "6rem", // FAB di atas footer
              }}
            >
              {/* Slide up animasi pakai translate-y dan transition */}
              <div
                className={`flex flex-col mb-2 gap-2 transition-all duration-300 ${
                  fabOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-12 pointer-events-none"
                }`}
              >
                <button
                  onClick={openAddMenu}
                  className="bg-black text-white px-5 py-2 rounded-full shadow hover:bg-gray-800 transition flex items-center gap-2"
                  style={{ minWidth: 160, textAlign: "left" }}
                >
                  <span className="font-bold text-lg">+</span> Tambah Gambar
                </button>
                <button
                  onClick={() => {
                    setDeleteMode((v) => !v);
                    setFabOpen(false);
                  }}
                  className={`px-5 py-2 rounded-full shadow transition flex items-center gap-2 text-white ${
                    deleteMode ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
                  }`}
                  style={{ minWidth: 160, textAlign: "left" }}
                >
                  <span className="font-bold text-lg">−</span> Hapus Gambar
                </button>
              </div>
              {/* Main FAB - Putih, + Hitam */}
              <button
                onClick={() => setFabOpen((v) => !v)}
                className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg border border-gray-200 transition-all duration-150 hover:scale-110 active:scale-95"
                aria-label="Menu Gambar"
                style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
              >
                <span className="text-black font-bold select-none">+</span>
              </button>
            </div>
          </div>
        )}
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
              onError={onImgError}
            />
          </div>
        </div>
      )}
      {/* Animasi untuk slide up (optional, jika belum ada di tailwind, tambahkan custom) */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
