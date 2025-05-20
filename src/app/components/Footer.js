"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 p-5 text-center text-sm mt-auto">
      <div className="flex justify-center flex-wrap gap-4">
        <p>&copy; {new Date().getFullYear()} Jendral Le Veteran</p>
        <a
          href="#"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
