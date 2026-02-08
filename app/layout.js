import { Outfit, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: '--font-bodoni' });

export const metadata = {
  title: "DraftXo | AI Project & Startup Generator",
  description: "Create any project or startup idea in seconds with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${bodoni.variable}`}>{children}</body>
    </html>
  );
}
