"use client";

import { useState } from "react";
import Image from "next/image";

// Data oyster
const oysterItem = {
  id: 1,
  mainImg: "/image/oyster.jpg",
  detailImg: "/image/oyster_det.jpg",
  alt: "Oyster",
};

export default function OysterMenu() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      {/* Thumbnail Oyster */}
      <div
        className="rounded-xl overflow-hidden shadow-lg cursor-pointer max-w-4xl mx-auto"
        onClick={() => setIsPreviewOpen(true)}
      >
        <Image
          src={oysterItem.mainImg}
          alt={oysterItem.alt}
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
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
            className="absolute top-0 left-0 w-full z-[9999] p-8 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-5xl w-full bg-black rounded-xl">
              {/* Close Button */}
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-yellow-400 z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Gambar Utama */}
              <div className="mb-6 flex justify-center">
                <Image
                  src={oysterItem.mainImg}
                  alt={oysterItem.alt}
                  width={1200}
                  height={1800}
                  className="object-contain max-w-full max-h-[90vh] rounded-lg"
                />
              </div>

              {/* Gambar Detail */}
              <div className="flex justify-center">
                <Image
                  src={oysterItem.detailImg}
                  alt={`${oysterItem.alt} detail`}
                  width={1200}
                  height={1800}
                  className="object-contain max-w-full max-h-[90vh] rounded-lg"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
