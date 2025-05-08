import { PrismaClient } from '@prisma/client';

// PrismaClient는 전역 변수로 선언하여 연결을 재사용합니다
// 이는 서버리스 환경에서 연결 효율성을 높이는 패턴입니다
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;