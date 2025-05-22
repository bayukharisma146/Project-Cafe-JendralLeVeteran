"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarMenu({ show, onClose }) {
  const router = useRouter();

  // Tutup sidebar dengan ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (show) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [show, onClose]);

  const tabIndex = show ? 0 : -1;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          show
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!show}
      />

      {/* Fullscreen Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen w-screen bg-black text-white flex flex-col items-center justify-center transform transition-transform duration-300 z-50 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!show}
        aria-label="Sidebar menu"
      >
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Close menu"
          tabIndex={tabIndex}
        >
          ← Back
        </button>

        <ul className="list-none text-center space-y-8">
          {[
            ["/", "HOME"],
            ["/menu", "MENU"],
            ["/reservation", "RESERVATIONS"],
            ["/gallery", "GALLERY"],
            ["/contact", "CONTACT"],
            ["/admin", "ADMIN"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="text-2xl text-white no-underline hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                tabIndex={tabIndex}
                onClick={onClose}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
