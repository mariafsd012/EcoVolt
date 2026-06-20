import "./globals.css";
import { Geist, Geist_Mono, Heebo } from "next/font/google"; // Agrupado para ficar mais limpo
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const heebo = Heebo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EcoVolt",
  description: "Sistema EcoVolt",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${heebo.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex bg-white">


        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}