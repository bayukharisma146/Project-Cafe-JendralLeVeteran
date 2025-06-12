"use client";

import Image from "next/image";
import { useState } from "react";

const riceMenus = [
  {
    id: 1,
    mainImg: "/image/rice1.jpg",
    detailImg: "/image/rice1_det.jpg",
    alt: "img 1",
  },
  {
    id: 2,
    mainImg: "/image/rice2.jpg",
    detailImg: "/image/rice2_det.jpg",
    alt: "img 2",
  },
];

export default function RiceMenu() {
  const [modalItem, setModalItem] = useState(null);

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {riceMenus.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={() => setModalItem(item)}
          >
            <Image
              src={item.mainImg}
              alt={item.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {modalItem && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-[9998]"
            onClick={() => setModalItem(null)}
          />

          {/* Modal Content */}
          <div
            className="absolute top-0 left-0 w-full z-[9999] p-8 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-5xl w-full bg-black rounded-xl">
              {/* Close Button */}
              <button
                onClick={() => setModalItem(null)}
                className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-yellow-400 z-50"
                aria-label="Close"
              >
                &times;
              </button>

              {/* Gambar Utama */}
              <div className="mb-6 flex justify-center">
                <Image
                  src={modalItem.mainImg}
                  alt={modalItem.alt}
                  width={1200}
                  height={1800}
                  className="object-contain max-w-full max-h-[90vh] rounded-lg"
                  priority
                />
              </div>

              {/* Gambar Detail */}
              <div className="flex justify-center">
                <Image
                  src={modalItem.detailImg}
                  alt={`${modalItem.alt} detail`}
                  width={1200}
                  height={1800}
                  className="object-contain max-w-full max-h-[90vh] rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
