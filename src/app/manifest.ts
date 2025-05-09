import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '바이브코딩 돈버는 아이디어 모음',
    short_name: '돈버는 아이디어',
    description: '다양한 수익 창출 아이디어를 발견하고, 공유하는 공간',
    start_url: '/',
    display: 'standalone',
    background_color: '#151422',
    theme_color: '#a48eff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}