import type { Metadata } from "next";

import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Whispr",
  description:
    "Whispr is a real-time chat app that lets you connect instantly with friends, teams, or communities — fast, secure, and beautifully simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
