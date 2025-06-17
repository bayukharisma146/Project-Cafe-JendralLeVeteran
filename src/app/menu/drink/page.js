"use client";

import { useState } from "react";
import Image from "next/image";

const drinks = [
  {
    id: 1,
    thumbnail: "/image/drink1.jpg",
    details: ["/image/drink1.jpg"],
    alt: "Drink 1",
  },
  {
    id: 2,
    thumbnail: "/image/drink1_det.jpg",
    details: ["/image/drink1_det.jpg"],
    alt: "Drink 1 Detail",
  },
  {
    id: 3,
    thumbnail: "/image/drink2.jpg",
    details: ["/image/drink2.jpg"],
    alt: "Drink 2",
  },
  {
    id: 4,
    thumbnail: "/image/drink2_det.jpg",
    details: ["/image/drink2_det.jpg"],
    alt: "Drink 2 Detail",
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
            className="absolute inset-0 bg-black bg-opacity-80 z-40"
            onClick={() => setSelectedDrink(null)}
          />

          {/* Modal Content */}
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-start px-4 pt-8">
            <div className="relative max-w-4xl w-full bg-black rounded-lg p-4">
              {/* Close button */}
              <button
                onClick={() => setSelectedDrink(null)}
                className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {selectedDrink.details.map((src, index) => (
                <div key={index} className="mb-6">
                  <Image
                    src={src}
                    alt={`${selectedDrink.alt} ${index + 1}`}
                    width={1000}
                    height={700}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
