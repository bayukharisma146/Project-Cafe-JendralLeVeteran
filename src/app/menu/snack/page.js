"use client";

import { useState } from "react";
import Image from "next/image";

const snacks = [
  { src: "/image/snack1.jpg", alt: "Snack 1" },
  { src: "/image/snack2.jpg", alt: "Snack 2" },
  { src: "/image/snack3.jpg", alt: "Snack 3" },
  { src: "/image/snack4.jpg", alt: "Snack 4" },
  { src: "/image/snack5.jpg", alt: "Snack 5" },
];

export default function SnackPage() {
  const [selectedSnack, setSelectedSnack] = useState(null);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {snacks.map((snack, idx) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setSelectedSnack(snack)}
          >
            <div className="relative w-full h-[320px]">
              <Image
                src={snack.src}
                alt={snack.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedSnack && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-40"
            onClick={() => setSelectedSnack(null)}
          />

          {/* Modal Content */}
          <div className="relative z-50 max-w-4xl mx-auto px-4 pt-24">
            {/* Close button */}
            <button
              onClick={() => setSelectedSnack(null)}
              className="fixed top-4 right-6 text-white text-3xl font-bold z-50 hover:text-red-500"
              aria-label="Close"
            >
              &times;
            </button>

            <Image
              src={selectedSnack.src}
              alt={selectedSnack.alt}
              width={1000}
              height={700}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </>
      )}
    </main>
  );
}
