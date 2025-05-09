import { MetadataRoute } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 경로
  const routes = [
    {
      url: 'https://idaa.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://idaa.vercel.app/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://idaa.vercel.app/login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://idaa.vercel.app/register',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://idaa.vercel.app/bookmarks',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // 아이디어 데이터 가져오기
  try {
    const { data: ideas } = await supabaseAdmin
      .from('ideas')
      .select('id, created_at')
      .order('created_at', { ascending: false });

    // 아이디어 동적 경로 추가
    const ideaRoutes = ideas?.map((idea) => ({
      url: `https://idaa.vercel.app/ideas/${idea.id}`,
      lastModified: new Date(idea.created_at),
      changeFrequency: 'weekly',
      priority: 0.9,
    })) || [];

    return [...routes, ...ideaRoutes];
  } catch (error) {
    console.error('사이트맵 생성 오류:', error);
    return routes;
  }
}