/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화 설정
  images: {
    domains: ['placeholder.svg', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true, // 정적 내보내기용
  },
  
  // 성능 최적화
  experimental: {
    optimizeCss: true,
  },
  
  // 정적 내보내기 설정 (필요시 활성화)
  // output: 'export',
  // trailingSlash: true,
  
  // 압축 설정
  compress: true,
  
  // 환경 변수 설정
  env: {
    SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || '제주 여행일기',
    SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '제주도 여행 정보와 문화를 공유하는 블로그',
  },
  
  // 헤더 설정
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig 