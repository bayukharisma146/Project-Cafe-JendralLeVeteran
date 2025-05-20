"use client"; // karena ada interaktif (hamburger, sidebar)

import { useState } from "react";

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-5 h-[70px] bg-black z-50 text-white">
        <div className="logo flex items-center gap-2 text-lg font-bold h-full">
          <img
            src="src/app/public/image/LOGO_JENDRAL.png"
            alt="Logo"
            className="logo-img h-full object-contain"
          />
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="hamburger text-3xl cursor-pointer z-50"
          aria-label="Open menu"
        >
          &#9776;
        </button>
      </header>

      {/* SIDEBAR MENU */}
      <aside
        id="sidebarMenu"
        className={`fixed top-0 left-0 h-screen w-screen bg-[#111] flex flex-col items-center justify-center z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!sidebarOpen}
      >
        <button
          className="back-btn absolute top-5 left-5 border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded hover:bg-yellow-400 hover:text-black transition"
          onClick={() => setSidebarOpen(false)}
        >
          Back
        </button>
        <ul className="list-none my-8 text-center">
          <li className="my-5">
            <a href="#" className="text-white text-xl no-underline">
              Home
            </a>
          </li>
          <li className="my-5">
            <a href="#" className="text-white text-xl no-underline">
              Menu
            </a>
          </li>
          <li className="my-5">
            <a href="#" className="text-white text-xl no-underline">
              Gallery
            </a>
          </li>
          <li className="my-5">
            <a href="#" className="text-white text-xl no-underline">
              Contact
            </a>
          </li>
        </ul>
      </aside>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-5 text-sm text-center">
        <div className="footer-content flex flex-wrap justify-center gap-3">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
        <p className="mt-2">&copy; 2025 Jendral. All rights reserved.</p>
      </footer>
    </>
  );
}
