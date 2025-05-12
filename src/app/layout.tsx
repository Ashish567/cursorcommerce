import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { BootstrapDarkMode } from "@/components/theme/BootstrapDarkMode";
// import { ForceLightTheme } from "@/components/theme/ForceLightTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-white text-black min-h-screen"}>
        {/* <ForceLightTheme /> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <BootstrapDarkMode />
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col bg-white">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8 bg-white">{children}</main>
              <ThemeToggle />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
