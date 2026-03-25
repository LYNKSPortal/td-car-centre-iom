import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/conditional-layout";
import { NextAuthProvider } from "@/components/providers/session-provider";

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
        <NextAuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
