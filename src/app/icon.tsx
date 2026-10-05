import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0B0C0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#EDECE8',
          borderRadius: '7px',
          border: '1.5px solid rgba(224, 169, 109, 0.45)',
          fontWeight: 700,
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <span>A</span>
        <div
          style={{
            position: 'absolute',
            bottom: '3px',
            right: '3px',
            width: '4px',
            height: '4px',
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
