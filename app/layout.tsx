import { Header } from "../components/Header";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Abdallah Abedraba",
  description: "Escaping randomness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col p-3 max-w-4xl mx-auto h-screen justify-between bg-white dark:bg-gray-900 text-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="py-10 mb-auto">{children}</main>
          <footer className="flex flex-col text-left text-gray-700 dark:text-gray-300">
            <span>Escape your randomness</span>
            <span>With {"<"}3</span>
          </footer>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
