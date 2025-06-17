"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SidebarMenu({ show, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  const tabIndex = show ? 0 : -1;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!show}
      />

      <nav
        className={`fixed top-0 left-0 h-screen w-screen bg-black text-white flex flex-col items-center justify-center transform transition-transform duration-300 z-50 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!show}
        aria-label="Sidebar menu"
      >
        <button
          onClick={onClose}
          className="absolute top-5 left-5 border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black"
          aria-label="Close menu"
          tabIndex={tabIndex}
        >
          ← Back
        </button>

        <ul className="text-center space-y-8 text-2xl">
          {[
            ["/", "HOME"],
            ["/menu", "MENU"],
            ["/reservasi", "RESERVATION"],
            ["/gallery", "GALLERY"],
            ["/contact", "CONTACT"],
            ["/admin", "ADMIN"],
          ].map(([href, label]) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
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
