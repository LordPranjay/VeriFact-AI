import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { 
  title: "Verifact AI - Real-Time Fact Checking to Combat Misinformation",
  description:
    "Verifact AI is a cutting-edge platform that leverages advanced AI algorithms to provide real-time fact-checking and misinformation detection across social media, news sites, and messaging platforms. Our mission is to empower users with accurate information and combat the spread of false narratives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Script
              defer
              data-domain="will add my domain" // Replace with your domain
              src="https://analytics-code.vercel.app/tracking-script.js"
          />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
