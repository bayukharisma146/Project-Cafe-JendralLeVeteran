"use client";

import Image from "next/image";

export default function Header({ onOpenMenu }) {
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-2 bg-black text-white z-50 h-[70px]">
      <div className="flex items-center font-bold text-lg gap-3 h-full">
        <Image
          src="/image/LOGO_JENDRAL.png"
          alt="Logo Jendral Le Veteran"
          width={50}
          height={50}
          className="object-contain"
        />
      </div>
      <button
        aria-label="Open menu"
        onClick={onOpenMenu}
        className="text-3xl cursor-pointer z-50 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
      >
        ☰
      </button>
    </header>
  );
}
