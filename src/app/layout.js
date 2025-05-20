import "./styles/globals.css";

export const metadata = {
  title: "Jendral Le Veteran",
  description: "Cafe & Restaurant Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[hwb(0_10%_90%)] text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
