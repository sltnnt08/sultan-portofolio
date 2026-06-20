import { ImageResponse } from 'next/og'

export const alt = "Sultan's Portfolio — Full-Stack Developer"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            marginBottom: 16,
            textAlign: 'center',
            padding: '0 40px',
          }}
        >
          Muhammad Sultan Nurulloh Telaumbanua
        </h1>
        <p
          style={{
            fontSize: 28,
            fontWeight: 400,
            margin: 0,
            color: '#cccccc',
          }}
        >
          Full-Stack Developer
        </p>
      </div>
    ),
    { ...size }
  )
}
