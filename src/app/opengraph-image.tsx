import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = '바이브코딩 돈버는 아이디어 모음';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #151422, #1e1c31)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            marginBottom: 20,
            color: '#a48eff',
            textAlign: 'center',
          }}
        >
          바이브코딩
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            marginBottom: 40,
            textAlign: 'center',
          }}
        >
          돈버는 아이디어 모음
        </div>
        <div
          style={{
            fontSize: 28,
            maxWidth: '70%',
            textAlign: 'center',
            color: '#d1c5ff',
            lineHeight: 1.5,
          }}
        >
          매일 업데이트되는 다양한 수익 창출 아이디어를 발견하고, 공유하고, 발전시키는 공간
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}