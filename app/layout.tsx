import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./Header.css";
import Header from "./Components/header/Header";
import { ProvedorBagres } from "./Context/BagresContext";
import Footer from "./Components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BAGRES FC",
  description: "Site oficial do BagresFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProvedorBagres>
      <html lang="en">
        <head>
          <link
            rel="icon"
            href="https://res.cloudinary.com/dtpsqmz73/image/upload/v1723651231/tdmqry1ecgxvl68jkzaj.png"
          />
        </head>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ProvedorBagres>
  );
}
