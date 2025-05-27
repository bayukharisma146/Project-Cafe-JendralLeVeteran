"use client";

import { useEffect, useState } from "react";
import { auth, onAuthStateChanged, signOut } from "../../lib/firebase";
import GalleryTabs from "../gallery/components/GalleryTabs";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("food");

  // cek auth state saat component mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (currentUser.email === "jendralleveteran@gmail.com") {
          setUser(currentUser);
        } else {
          setUser(null); // user bukan admin
          alert("Unauthorized user");
        }
      } else {
        setUser(null); // belum login
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // fungsi logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  // Jika belum login / user tidak ada
  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-6">
        <h2 className="mb-4 text-2xl font-bold">Login as Admin</h2>
        <button
          onClick={() => {
            import("firebase/auth").then(
              ({ GoogleAuthProvider, signInWithPopup }) => {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider).catch((error) =>
                  alert(error.message)
                );
              }
            );
          }}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Login with Google
        </button>
      </div>
    );
  }

  // Jika sudah login dan user adalah admin
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-3xl font-bold">Gallery Admin</h1> */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <GalleryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={true}
      />
    </div>
  );
}
