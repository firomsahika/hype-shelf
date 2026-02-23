import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/lib/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypeShelf – Collect and share the stuff you're hyped about",
  description:
    "A shared recommendations hub for friends. Log in and share your favorite movies in one clean, public shelf.",
  openGraph: {
    title: "HypeShelf",
    description: "Collect and share the stuff you're hyped about.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </head>
        <body className="min-h-screen bg-slate-950 text-white antialiased" suppressHydrationWarning>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
