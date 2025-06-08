"use client";

import Image from "next/image";

export default function SoupMenu() {
    return (
        <main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12">

        <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Kiri - 45% */}
            <div className="w-full md:w-[45%] rounded-xl overflow-hidden shadow-lg">
            <Image
                src="/image/soup1.jpg"
                alt="Brunch Dish 1"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-xl"
            />
            </div>

            {/* Kanan - 55% */}
            <div className="w-full md:w-[45%] rounded-xl overflow-hidden shadow-lg">
            <Image
                src="/image/soup2.jpg"
                alt="Brunch Dish 2"
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-xl"
            />
            </div>
        </div>
        </main>
    );
}
