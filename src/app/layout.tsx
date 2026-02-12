import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClientProviderWrapper } from "@/components/providers/query-client";

import { env } from "@/config/env";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_BASE_URL),
  title: {
    default: "SaaS Platform",
    template: "%s | SaaS Platform",
  },
  description: "Secure and efficient SaaS platform for your business needs.",
  keywords: ["SaaS", "Dashboard", "Project Management", "Productivity"],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.APP_BASE_URL,
    title: "SaaS Platform",
    description: "Secure and efficient SaaS platform for your business needs.",
    siteName: "SaaS Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
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
