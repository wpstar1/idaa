/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // 빌드 시 ESLint 검사를 비활성화합니다
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 빌드 시 타입 검사를 비활성화합니다
    ignoreBuildErrors: true,
  },
  // 이미지 최적화 설정
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // 정적 페이지 최적화
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true,
  },
  // 페이지 로딩 최적화
  reactStrictMode: true,
  // 사이트 성능 향상을 위한 헤더 추가
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;