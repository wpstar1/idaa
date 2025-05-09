import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#151422',  // 어두운 배경색과 일치하도록 변경
}

export const metadata: Metadata = {
  title: '바이브코딩 돈버는 아이디어 모음',
  description: '매일 업데이트되는 다양한 수익 창출 아이디어를 발견하고, 공유하고, 발전시키는 공간입니다. AI, SaaS, 부업, 투자 전략 등 경제적 자유를 위한 아이디어를 찾아보세요.',
  keywords: '돈버는 아이디어, 수익 창출, 부업, 창업, AI 아이디어, SaaS, 자동화, 투자 전략, 바이브코딩',
  authors: [{ name: '바이브코딩', url: 'https://idaa.vercel.app' }],
  creator: '바이브코딩',
  publisher: '바이브코딩',
  robots: 'index, follow',
  applicationName: '바이브코딩 돈버는 아이디어 모음',
  
  // 다양한 기기에서 호환되는 아이콘 설정
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
    shortcut: '/favicon.ico',
  },
  
  // 오픈그래프 메타데이터
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://idaa.vercel.app',
    title: '바이브코딩 돈버는 아이디어 모음',
    description: '매일 업데이트되는 다양한 수익 창출 아이디어를 발견하고, 공유하고, 발전시키는 공간입니다.',
    siteName: '바이브코딩 돈버는 아이디어 모음',
    images: [
      {
        url: 'https://idaa.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '바이브코딩 돈버는 아이디어 모음',
      },
    ],
  },
  
  // 트위터 카드
  twitter: {
    card: 'summary_large_image',
    title: '바이브코딩 돈버는 아이디어 모음',
    description: '매일 업데이트되는 다양한 수익 창출 아이디어를 발견하고, 공유하고, 발전시키는 공간입니다.',
    images: ['https://idaa.vercel.app/og-image.jpg'],
  },
  
  // 비즈니스 카테고리
  category: 'business',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} bg-[#151422] text-white`}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}