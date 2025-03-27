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
    "Verifact AI leverages real-time AI-powered analysis to detect and combat misinformation, empowering users with verified facts for informed decision-making in the digital age.",
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
