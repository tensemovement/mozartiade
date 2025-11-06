import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";

// Elegant serif font for headings - inspired by 18th century typography
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

// Modern sans-serif for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Korean serif font for headings
const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-noto-serif-kr",
  display: "swap",
});

// Korean sans-serif for body text
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EnjoyMozart Portal",
  description: "모차르트의 우아함에서 영감받은 클래식 음악 포털",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${inter.variable} ${playfair.variable} ${notoSansKR.variable} ${notoSerifKR.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
