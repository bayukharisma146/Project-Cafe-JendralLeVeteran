    "use client";

    import { useState } from "react";
    import SidebarMenu from "./SidebarMenu";

    export default function Shell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
        <header className="fixed top-0 left-0 w-full flex justify-between items-center px-5 h-[70px] bg-black z-50 text-white">
            <div className="logo flex items-center gap-2 text-lg font-bold h-full">
            <img
                src="/image/LOGO_JENDRAL.png"
                alt="Logo"
                className="h-full object-contain"
            />
            </div>
            <button
            onClick={() => setSidebarOpen(true)}
            className="text-3xl cursor-pointer z-50"
            aria-label="Open menu"
            >
            &#9776;
            </button>
        </header>

        <SidebarMenu show={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="pt-[70px] pb-[60px]">{children}</main>

        <footer className="fixed bottom-0 left-0 w-full bg-black text-gray-400 py-3 text-sm text-center z-50">
            <div className="flex flex-wrap justify-center gap-3">
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
