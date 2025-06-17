"use client";

import { useState } from "react";
import Image from "next/image";

// Data dessert
const dessertItem = {
  id: 1,
  mainImg: "/image/dessert.jpg",
  detailImg: "/image/dessert_det.jpg",
  alt: "Dessert",
};

export default function DessertMenu() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      {/* Thumbnail Dessert */}
      <div
        className="rounded-xl overflow-hidden shadow-lg cursor-pointer max-w-4xl mx-auto"
        onClick={() => setIsPreviewOpen(true)}
      >
        <Image
          src={dessertItem.mainImg}
          alt={dessertItem.alt}
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
          priority
        />
      </div>

      {/* Modal Preview */}
      {isPreviewOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-[9998]"
            onClick={() => setIsPreviewOpen(false)}
          />

          {/* Modal Content */}
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-black rounded-xl p-4 max-w-3xl w-full flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-yellow-400 z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Gambar Utama */}
              <Image
                src={dessertItem.mainImg}
                alt={dessertItem.alt}
                width={900}
                height={700}
                className="object-contain max-w-full max-h-[80vh] rounded-lg"
                priority
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
