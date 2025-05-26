import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "제주 여행일기 | 제주도 여행 정보와 문화 공유",
    template: "%s | 제주 여행일기"
  },
  description: "제주도의 아름다운 여행 정보와 문화를 공유하는 블로그 플랫폼입니다. 최신 여행소식, 문화행사, 여행팁을 만나보세요.",
  keywords: ["제주도", "여행", "문화행사", "여행소식", "제주 여행", "관광", "블로그"],
  authors: [{ name: "제주 여행일기" }],
  creator: "제주 여행일기",
  publisher: "제주 여행일기",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    title: '제주 여행일기',
    description: '제주도의 아름다운 여행 정보와 문화를 공유하는 블로그 플랫폼',
    siteName: '제주 여행일기',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '제주 여행일기',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '제주 여행일기',
    description: '제주도의 아름다운 여행 정보와 문화를 공유하는 블로그 플랫폼',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
