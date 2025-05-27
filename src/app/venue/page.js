"use client";

import Image from "next/image";

export default function VenuePage() {
    return (
        <div className="pt-24 px-4">
        <div className="w-[80%] mx-auto rounded-xl overflow-hidden shadow-lg">
            <Image
            src="/image/venue.jpg"
            alt="Venue"
            width={1000}
            height={1080}
            className="w-full h-auto object-cover"
            />
        </div>
        </div>
    );
}
