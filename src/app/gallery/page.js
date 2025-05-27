"use client";

import { useState, useEffect } from "react";
import GalleryTabs from "./components/GalleryTabs";
import { auth } from "../../lib/firebase.js"; // ← gunakan relatif path ke /lib/firebase.js
import { onAuthStateChanged } from "firebase/auth";

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("food");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email === "jendralleveteran@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="pt-24 px-6 max-w-6xl mx-auto">
      <GalleryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
      />
    </section>
  );
}
