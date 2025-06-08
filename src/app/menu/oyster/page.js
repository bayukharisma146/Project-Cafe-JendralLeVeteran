"use client";

import { useState } from "react";
import Image from "next/image";

export default function OysterMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const oysterImages = [
    "/image/oyster.jpg",
    "/image/oyster_det.jpg",
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      {/* Preview (klik untuk buka modal) */}
      <div
        className="cursor-pointer rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/image/oyster.jpg"
          alt="Oyster Preview"
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal content */}
          <div className="relative z-50 max-w-4xl mx-auto px-4 pt-24">
            {/* Tombol tutup */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed top-4 right-6 text-white text-3xl font-bold z-50 hover:text-red-500"
              aria-label="Close"
            >
              &times;
            </button>

            {oysterImages.map((src, index) => (
              <div key={index} className="mb-6">
                <Image
                  src={src}
                  alt={`Oyster Detail ${index + 1}`}
                  width={1000}
                  height={700}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
