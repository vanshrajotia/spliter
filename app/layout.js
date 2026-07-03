import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spliter",
  description: "The smartest way to split your bills",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
    >
      <body className="min-h-full flex flex-col">

        <Header />

        <main className="minh-h-screen">
          {children}
        </main>
        
        
        </body>
    </html>
  );
}
