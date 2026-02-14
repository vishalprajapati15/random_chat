import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Random Chat",
  description: "Random video or voice chat with random people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
