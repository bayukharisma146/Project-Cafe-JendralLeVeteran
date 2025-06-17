"use client";

import Image from "next/image";
import { useState } from "react";

const mainCourses = [
  {
    src: "/image/maincourse1.jpg",
    alt: "Main Course 1",
  },
  {
    src: "/image/maincourse2.jpg",
    alt: "Main Course 2",
  },
  {
    src: "/image/maincourse3.jpg",
    alt: "Main Course 3",
  },
  {
    src: "/image/maincourse4.jpg",
    alt: "Main Course 4",
  },
  {
    src: "/image/maincourse5.jpg",
    alt: "Main Course 5",
  },
];

export default function MainCourseMenu() {
  const [modalImg, setModalImg] = useState(null);

  // Cek apakah hanya ada 1 gambar di preview (default sekarang memang cuma 1)
  const singleImagePreview = true; // karena modalImg selalu 1 gambar

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      {/* Gallery grid */}
      <div className="flex flex-col md:flex-row gap-8 items-center flex-wrap justify-center">
        {mainCourses.map((course, idx) => (
          <div
            key={idx}
            className="w-full md:w-auto rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            onClick={() => setModalImg(course)}
          >
            <div>
              <Image
                src={course.src}
                alt={course.alt}
                width={400}
                height={320}
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl mx-auto"
                priority={idx === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-4"
          onClick={() => setModalImg(null)}
          style={{ overflow: "visible" }} // biar scroll halaman tetap jalan
        >
          <div
            className={`relative w-full max-w-[90vw] ${
              singleImagePreview ? "" : "overflow-auto max-h-[90vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-yellow-400 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={() => setModalImg(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <Image
              src={modalImg.src}
              alt={modalImg.alt}
              width={1200}
              height={800}
              className={`object-contain rounded-lg ${
                singleImagePreview ? "max-h-[90vh]" : ""
              }`}
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
