"use client";
import { useState } from "react";
import Header from "./components/Header";
import SidebarMenu from "./components/SidebarMenu";
import Footer from "./components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <SidebarMenu show={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="flex-grow text-center pt-32 px-5">
        <h1 className="text-3xl mb-10">Welcome to Jendral Le Veteran</h1>
      </main>

      <Footer />
    </>
  );
}
