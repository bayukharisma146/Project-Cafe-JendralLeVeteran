"use client";

import Image from "next/image";

export default function SoupMenu() {
    return (
        <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12">
            {/* Hero Section */}
            <div className="relative w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden shadow-lg mb-8 flex items-center">
                <Image
                    src="/image/people/people5.jpg" // Ganti dengan path gambar hero Anda
                    alt="Pasta Hero"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
                    <h1 className="text-2xl md:text-4xl font-bold text-yellow-100 drop-shadow-lg">
                        Made by Jendral Le Veteran<br />Enjoyed by Everyone.
                    </h1>
                </div>
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Soup Images */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Kiri - 45% */}
                
                {/* Kanan - 55% */}
                
            </div>
        </main>
    );
}