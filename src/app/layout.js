import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SMT Library",
  description: "Digital Manuscript & Rare Books Archive",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >

        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">

          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

            {/* LOGO */}
            <Link href="/">

              <div className="flex items-center gap-3">

                <div className="h-3 w-3 rounded-full bg-amber-500" />

                <h1 className="text-2xl font-bold tracking-wide">
                  SMT Library
                </h1>
              </div>
            </Link>

            {/* NAV LINKS */}
            <nav className="flex items-center gap-8 text-sm font-medium">

              <Link
                href="/"
                className="transition hover:text-amber-400"
              >
                Home
              </Link>

              <Link
                href="/manuscripts"
                className="transition hover:text-amber-400"
              >
                Manuscripts
              </Link>

              <Link
                href="/books"
                className="transition hover:text-amber-400"
              >
                Books
              </Link>

            </nav>
          </div>
        </header>

        {children}

      </body>
    </html>
  );
}