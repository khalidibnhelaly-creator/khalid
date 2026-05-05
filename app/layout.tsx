import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khalid Bin Helaly — AI Creative Entrepreneur",
  description:
    "Bangladeshi AI creative entrepreneur. Building brands, films, automation systems, and AI-powered products at the intersection of technology and storytelling.",
  icons: {
    icon: "/Topzidlogo.png",
    apple: "/Topzidlogo.png",
  },
  openGraph: {
    title: "Khalid Bin Helaly — AI Creative Entrepreneur",
    description:
      "Bangladeshi AI creative entrepreneur. Building brands, films, automation systems, and AI-powered products at the intersection of technology and storytelling.",
    images: ["/Topzidlogo.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
