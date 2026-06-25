import type { Metadata } from "next";
import { Noto_Sans_KR, Outfit } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "르 보드레 레스테티크 | 프리미엄 펫 에스테틱 & 아로마 스파",
  description: "우리 아이의 건강한 피부와 마음을 위한 다정한 쉼, 르 보드레 레스테티크 프리미엄 펫 에스테틱 & 아로마 스파",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
