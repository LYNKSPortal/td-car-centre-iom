import type { Metadata, Viewport } from "next";
import { Host_Grotesk } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { NextAuthProvider } from "@/components/providers/session-provider";

export const dynamic = 'force-dynamic';

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
            <div className="bg-black min-h-screen flex items-center justify-center p-4">
              <div className="text-center max-w-3xl">
                <div className="mb-8 flex justify-center">
                  <Image
                    src="/images/logo-white-and-red.png"
                    alt="TD Car Centre Logo"
                    width={200}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-8">TD CAR WEBSITE UNDER MAINTENANCE</h1>
                <p className="text-white text-base md:text-lg leading-relaxed">
                  We're currently carrying out maintenance to improve your experience. While we make these updates, our website may have limited functionality, but our team is still here to help with all sales, finance, vehicle enquiries, part exchange, aftersales, and TT Rentals. If you need assistance, please call us on 01624 670590 or email tony@tdcar.im, and we'll be happy to help. Thank you for your patience, we look forward to welcoming you back very soon with an even better online experience.
                </p>
              </div>
            </div>
          </NextAuthProvider>
      </body>
    </html>
  );
}
