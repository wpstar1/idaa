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
};

module.exports = nextConfig;