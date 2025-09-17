import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YatraBook",
  description: "YatraBook - Smart India Hackathon 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
