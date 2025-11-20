import type { Metadata } from "next";
import "../styles/globals.css";
import { Providers } from "./providers";
import LayoutContent from "@/components/LayoutContent";

export const metadata: Metadata = {
  title: "Mozartiade Portal - 모차르트 완전 카탈로그",
  description: "모차르트의 626개 작품을 탐색하세요. 완전한 Köchel 카탈로그, 연대기, 악보, 음원, 영상, 해설까지 모든 자료를 제공합니다.",
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&family=Noto+Serif+KR:wght@400;500;600;700;900&family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
