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
          {/* Overlay hitam semi transparan */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-[9998]"
            onClick={() => setModalItem(null)}
          />

          {/* Tombol close, sedikit lebih bawah */}
          <button
            className="fixed top-12 right-6 z-[10000] text-white text-4xl font-bold hover:text-yellow-400"
            onClick={() => setModalItem(null)}
            aria-label="Close"
          >
            &times;
          </button>

          {/* Modal konten - pakai absolute supaya ikut scroll browser */}
          <div
            className="absolute top-0 left-0 w-full z-[9999] p-8 flex justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl w-full bg-neutral-900 rounded-xl p-6">
              <Image
                src={modalItem.mainImg}
                alt={modalItem.alt}
                width={800}
                height={600}
                className="rounded-lg mb-4 w-full"
              />
              <Image
                src={modalItem.detailImg}
                alt={`${modalItem.alt} detail`}
                width={800}
                height={600}
                className="rounded-lg w-full"
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
