"use client";

import { useState } from "react";
import Image from "next/image";

const drinks = [
  {
    id: 1,
    thumbnail: "/image/drink1.jpg",
    details: ["/image/drink1.jpg", "/image/drink1_det.jpg"],
    alt: "Drink 1",
  },
  {
    id: 2,
    thumbnail: "/image/drink2.jpg",
    details: ["/image/drink2.jpg", "/image/drink2_det.jpg"],
    alt: "Drink 2",
  },
];

export default function DrinkMenu() {
  const [selectedDrink, setSelectedDrink] = useState(null);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {drinks.map((drink) => (
          <div
            key={drink.id}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg"
            onClick={() => setSelectedDrink(drink)}
          >
            <Image
              src={drink.thumbnail}
              alt={drink.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedDrink && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-40"
            onClick={() => setSelectedDrink(null)}
          />

          {/* Modal Content */}
          <div className="relative z-50 max-w-4xl mx-auto px-4 pt-24">
            {/* Close button */}
            <button
              onClick={() => setSelectedDrink(null)}
              className="fixed top-4 right-6 text-white text-3xl font-bold z-50 hover:text-red-500"
              aria-label="Close"
            >
              &times;
            </button>

            {selectedDrink.details.map((src, index) => (
              <div key={index} className="mb-6">
                <Image
                  src={src}
                  alt={`${selectedDrink.alt} Detail ${index + 1}`}
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
