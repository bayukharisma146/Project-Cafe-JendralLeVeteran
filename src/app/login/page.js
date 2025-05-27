    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";
    import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    } from "firebase/auth";
    import { auth } from "../../lib/firebase"; // Sesuaikan path firebase config-mu

    export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/reservasi"); // Redirect ke halaman reservasi setelah login
        } catch (error) {
        alert("Login gagal: " + error.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push("/reservasi");
        } catch (error) {
        alert("Login Google gagal: " + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
        <h1 className="text-3xl mb-6">Login</h1>
        <form
            onSubmit={handleEmailLogin}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded bg-gray-900 border border-gray-700"
            required
            />
            <button
            type="submit"
            className="bg-[#f8f2dc] text-black py-2 rounded font-semibold hover:opacity-90"
            >
            Login
            </button>
        </form>

        <button
            onClick={handleGoogleLogin}
            className="mt-6 bg-blue-600 py-2 px-4 rounded hover:opacity-90"
        >
            Login with Google
        </button>

        <p className="mt-6 text-gray-400 text-sm">
            Belum punya akun?{" "}
            <a href="/register" className="underline">
            Register
            </a>
        </p>
        </div>
    );
    }
