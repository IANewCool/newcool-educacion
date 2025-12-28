import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Educacion Superior Chile | NewCooltura Informada",
  description: "Buscador de universidades, becas, calculadora de financiamiento, proceso de admision PAES y beneficios estudiantiles en Chile",
  keywords: ["universidades Chile", "becas estudiantiles", "PAES", "admision universitaria", "gratuidad"],
  openGraph: {
    title: "Educacion Superior Chile - NewCooltura Informada",
    description: "Universidades, becas y admision PAES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
