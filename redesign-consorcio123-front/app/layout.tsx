import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Consorcio123",
  description: "Redesign plataforma consorcio123",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script id="high-contrast-bootstrap" strategy="beforeInteractive">
          {`(() => {
            try {
              const value = window.localStorage.getItem('consorcio123-high-contrast');
              if (value !== null) {
                document.documentElement.dataset.highContrast = value;
              }
            } catch (error) {}
          })();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
          {children}
      </body>
    </html>
  );
}
