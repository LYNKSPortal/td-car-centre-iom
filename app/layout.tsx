import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "TD Car Centre - Premium Luxury & Prestige Vehicles",
  description: "Discover our exceptional collection of luxury and prestige vehicles. Competitive finance, nationwide delivery, and outstanding service.",
  keywords: ["luxury cars", "prestige vehicles", "car dealership", "finance", "used cars"],
  openGraph: {
    title: "TD Car Centre - Premium Luxury & Prestige Vehicles",
    description: "Discover our exceptional collection of luxury and prestige vehicles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hostGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
