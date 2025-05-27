        "use client";

        import Link from "next/link";
        import { usePathname } from "next/navigation";

        export default function Header() {
        const pathname = usePathname();

        // Kondisi apakah user sedang di halaman /menu
        const isMenuPage = pathname.startsWith("/menu");

        return (
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <nav className="flex items-center gap-6 bg-black/80 text-white px-4 py-2 rounded-2xl shadow-lg backdrop-blur-md">
            {/* Logo */}
            <Link href="/" className="text-lg tracking-widest font-semibold">
                <span className="font-serif">JENDERAL</span>
            </Link>

            {/* Menu Items */}
            <div className="flex gap-4 ml-4 text-sm">
                {isMenuPage ? (
                // Tampilan menu khusus di halaman /menu
                <>
                    <Link href="/" className="hover:underline">
                    HOME
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#brunch" className="hover:underline">
                    BRUNCH
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#snack" className="hover:underline">
                    SNACK
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#soup" className="hover:underline">
                    SOUP
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#oyster" className="hover:underline">
                    OYSTER
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#pasta" className="hover:underline">
                    PASTA
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#pizza" className="hover:underline">
                    PIZZA
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link
                    href="/menu#main-course" className="hover:underline whitespace-nowrap">
                    MAIN COURSE
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#rice" className="hover:underline">
                    RICE
                    </Link> <span className="px-1 text-white/40">|</span>

                    <Link href="/menu#dessert" className="hover:underline">
                    DESSERT
                    </Link> <span className="px-1 text-white/40">|</span>
                    
                    <Link href="/menu#drink" className="hover:underline">
                    DRINK
                    </Link>
                </>
                ) : (
                // Tampilan default di halaman lain
                <>
                    <Link href="/" className="hover:underline">
                    HOME
                    </Link>
                    <Link href="/menu" className="hover:underline">
                    MENU
                    </Link>
                    <Link href="/reservasi">RESERVASI</Link>
                    <Link href="/venue">VENUE</Link>
                    <Link href="/gallery">GALLERY</Link>
                    <Link href="/contact">CONTACT</Link>
                    <Link href="/admin">ADMIN</Link>
                </>
                )}
            </div>
            </nav>
        </header>
    );
}
