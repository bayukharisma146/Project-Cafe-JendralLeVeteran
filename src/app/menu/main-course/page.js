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

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
      <div className="flex flex-col md:flex-row gap-8 items-center flex-wrap justify-center">
        {mainCourses.map((course, idx) => (
          <div
            key={idx}
            className="w-full md:w-[45%] rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
            onClick={() => setModalImg(course)}
          >
            <div className="relative w-full h-[320px]">
              <Image
                src={course.src}
                alt={course.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={idx === 0}
              />
            </div>
            <div className="text-center mt-2">
              <span className="text-lg font-semibold tracking-wide block">{course.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview - Fullscreen No Scroll */}
      {modalImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center"
          onClick={() => setModalImg(null)}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-6 text-white text-4xl font-bold hover:text-yellow-400 z-10"
              onClick={() => setModalImg(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative w-full h-full">
              <Image
                src={modalImg.src}
                alt={modalImg.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
