import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 104,
          background: '#0B0C0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EDECE8',
          borderRadius: '40px',
          border: '6px solid rgba(224, 169, 109, 0.45)',
          fontWeight: 700,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <span>A</span>
        <div
          style={{
            position: 'absolute',
            bottom: '26px',
            right: '26px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#E0A96D',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
