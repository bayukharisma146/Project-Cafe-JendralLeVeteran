"use client";

import Image from "next/image";
import { useState } from "react";

const snacks = [
	{ src: "/image/snack1.jpg", alt: "Snack 1" },
	{ src: "/image/snack2.jpg", alt: "Snack 2" },
	{ src: "/image/snack3.jpg", alt: "Snack 3" },
	{ src: "/image/snack4.jpg", alt: "Snack 4" },
	{ src: "/image/snack5.jpg", alt: "Snack 5" },
];

export default function SnackPage() {
	const [modalImg, setModalImg] = useState(null);

	// Selalu satu gambar di preview
	const singleImagePreview = true;

	return (
		<main className="min-h-screen bg-black text-white p-8 flex flex-col gap-12 relative">
			{/* Gallery grid */}
			<div className="flex flex-col md:flex-row gap-8 items-center flex-wrap justify-center">
				{snacks.map((snack, idx) => (
					<div
						key={idx}
						className="w-full md:w-auto rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group cursor-pointer"
						onClick={() => setModalImg(snack)}
					>
						<div>
							<Image
								src={snack.src}
								alt={snack.alt}
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
					style={{ overflow: "visible" }}
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
