"use client";

import { useState } from "react";
import Image from "next/image";

export default function PizzaMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pizzaImages = [
    "/image/pizza.jpg",
    "/image/pizza_det.jpg",
  ];

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">

      {/* Gambar Preview (gabungan) */}
      <div
        className="cursor-pointer rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto"
        onClick={() => setIsModalOpen(true)}
      >
        <Image
          src="/image/pizza.jpg"
          alt="Pizza Preview"
          width={800}
          height={600}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Konten */}
          <div className="relative z-50 max-w-4xl mx-auto px-4 pt-24">
            {/* Tombol Tutup */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed top-4 right-6 text-white text-3xl font-bold z-50 hover:text-red-500"
              aria-label="Close"
            >
              &times;
            </button>

            {pizzaImages.map((src, index) => (
              <div key={index} className="mb-6">
                <Image
                  src={src}
                  alt={`Pizza Detail ${index + 1}`}
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

