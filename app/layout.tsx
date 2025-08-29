import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { StateContext } from "../context/StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeadPhones Studio",
  description: "Best headphones in the market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <Navbar />
          {children}
        </StateContext>
      </body>
    </html>
  );
}
