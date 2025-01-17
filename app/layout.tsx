// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Pokemon Battle",
  description: "3D Pokemon Battle System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen bg-black overflow-hidden`}>
        <div className="fixed inset-0 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}