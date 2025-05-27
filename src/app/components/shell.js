    "use client";

    import Header from "./Header"; // Header estetik

    export default function Shell({ children }) {
    return (
        <div className="relative min-h-screen bg-black text-white">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="pt-[70px] pb-[60px] px-4 md:px-12 min-h-[calc(100vh-130px)]">
            {children}
        </main>

        {/* Footer */}
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
        </div>
    );
    }
