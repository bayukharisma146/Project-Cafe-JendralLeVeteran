"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {" "}
      {/* Elemen pembungkus utama */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Gambar Besar (75%) */}
        <div className="w-full md:w-[75%] h-[400px]">
          <Image
            src="/image/logo house.jpg"
            alt="Tampilan Cafe"
            width={1000}
            height={800}
            className="rounded-xl w-full h-full object-cover shadow-lg"
          />
        </div>

        {/* Tiga Gambar Kecil (25%) dalam kolom vertikal */}
        <div className="w-full md:w-[25%] flex flex-col gap-4">
          {[
            {
              src: "/image/maincourse.jpg",
              alt: "Suasana 1",
              buttonText: "Menu",
              href: "/menu",
            },
            {
              src: "/image/venue.jpg",
              alt: "Suasana 2",
              buttonText: "Venue",
              href: "/venue",
            },
            {
              src: "/image/other/other1.jpg",
              alt: "Suasana 3",
              buttonText: "Gallery",
              href: "/gallery",
            },
          ].map((img, index) => (
            <div
              key={index}
              className="relative rounded-xl overflow-hidden shadow-md w-full h-[120px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
              {img.buttonText && img.href && (
                <Link
                  href={img.href}
                  className="absolute bottom-0 right-0 bg-black bg-opacity-90 text-white px-3 py-0.5 rounded-md flex items-center gap-1 text-xs font-semibold uppercase hover:bg-opacity-100 transition-shadow shadow-md"
                >
                  {img.buttonText}
                  <span className="text-sm font-bold">&gt;</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Gambar kata1 di bawah konten utama */}
      <div className="w-full rounded-xl overflow-hidden shadow-lg mt-6">
        <Image
          src="/image/kata1.jpg"
          alt="Kata-kata motivasi"
          width={1200}
          height={0}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
