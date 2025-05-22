"use client"; // karena ada interaktif (hamburger, sidebar)

import { useState } from "react";
import Image from "next/image";
import Shell from "./components/Shell";

export default function HomePage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold">Selamat datang di Jendral Le Veteran!</h1>
      <p className="mt-4">Nikmati sajian terbaik kami di cafe & restoran dengan suasana nyaman.</p>
    </section>
  );

}
