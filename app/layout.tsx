import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Maritime Events Europe — Discover High-Value Industry Events",
  description:
    "Discover and filter high-value maritime industry events across Europe with intelligence on attendance, investors, and deal flow.",
  openGraph: {
    title: "Maritime Events Europe",
    description:
      "High-value maritime events across Europe with intelligence on attendance, investors, and deal flow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50">
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-slate-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © 2026 Maritime Events Europe. All rights reserved.
            </p>
            <p className="text-xs text-slate-300">
              Data is for informational purposes. Event details may change.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
