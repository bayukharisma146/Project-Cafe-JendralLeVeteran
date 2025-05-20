/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // untuk Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // untuk Pages Router (jika digunakan)
    "./components/**/*.{js,ts,jsx,tsx}", // untuk komponen
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
