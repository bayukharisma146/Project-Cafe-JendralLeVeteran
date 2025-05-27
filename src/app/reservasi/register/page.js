    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    } from "firebase/auth";
    import { auth } from "@/lib/firebase"; // Gunakan alias path jika sudah diset di tsconfig/jsconfig

    export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/reservasi");
        } catch (error) {
        // Menampilkan pesan error yang lebih user-friendly
        if (error.code === "auth/email-already-in-use") {
            alert("Email sudah digunakan.");
        } else if (error.code === "auth/invalid-email") {
            alert("Email tidak valid.");
        } else if (error.code === "auth/weak-password") {
            alert("Password terlalu lemah (minimal 6 karakter).");
        } else {
            alert("Register gagal: " + error.message);
        }
        }
    };

    const handleGoogleRegister = async () => {
        try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push("/reservasi");
        } catch (error) {
        alert("Google Sign-In gagal: " + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl mb-6">Register</h1>
        <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4 w-full max-w-sm"
        >
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-900 border border-gray-700"
            required
            />
            <input
            type="password"
            placeholder="Password (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-900 border border-gray-700"
            minLength={6}
            required
            />
            <button
            type="submit"
            className="bg-[#f8f2dc] text-black py-2 rounded font-semibold hover:opacity-90"
            >
            Register
            </button>
        </form>

        <button
            onClick={handleGoogleRegister}
            className="mt-6 bg-blue-600 py-2 px-4 rounded hover:opacity-90"
        >
            Register with Google
        </button>

        <p className="mt-6 text-gray-400 text-sm">
            Sudah punya akun?{" "}
            <a href="/login" className="underline">
            Login
            </a>
        </p>
        </div>
    );
    }
