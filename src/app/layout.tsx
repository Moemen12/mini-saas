import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProviderWrapper } from "@/components/providers/query-client";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Signin - SaaS Platform",
  description: "Secure signin to your account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}
