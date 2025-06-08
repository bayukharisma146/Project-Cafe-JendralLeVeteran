"use client";

import Image from "next/image";
import { useState } from "react";

export default function DessertMenu() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div
          className="w-full md:w-[45%] rounded-xl overflow-hidden shadow-lg cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <Image
            src="/image/dessert.jpg"
            alt="Dessert Dish 1"
            width={800}
            height={600}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Modal Preview */}
      {modalOpen && (
        // Klik gambar fullscreen akan menutup modal
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-[9999] cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <Image
            src="/image/dessert.jpg"
            alt="Dessert Dish 1"
            width={1200}
            height={1800}
            className="object-contain max-w-full max-h-full"
            priority
          />
        </div>
      )}
    </main>
  );
}
