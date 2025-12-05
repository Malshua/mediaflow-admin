"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "@/redux/providers/AppProvider";
import { DarkModeToggler } from "@/components/widgets";
import { ThemeProvider } from "next-themes";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <AppProvider>
          {children}

          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
