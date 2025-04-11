import { useEffect, useRef, useState } from 'react'
import Globe from 'globe.gl'
// import earthbluemarble from './assets/earth-blue-marble.jpg'
// import nightsky from './assets/night-sky.png'

type PointData = {
  lat: number
  lng: number
  size: number
  color: string
  name: string
}

const samplePoints: PointData[] = [
  { lat: 40.7128, lng: -74.0060, size: 0.5, color: 'red', name: 'New York' },
  { lat: 51.5074, lng: -0.1278, size: 0.5, color: 'blue', name: 'London' },
  { lat: 35.6895, lng: 139.6917, size: 0.5, color: 'green', name: 'Tokyo' }
]

export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null)


  useEffect(() => {
    if (!globeRef.current) return

    const world = Globe()(globeRef.current, {
        rendererConfig: {
            antialias: true,
            logarithmicDepthBuffer: true,
        }
        })
      .globeImageUrl('/Earth-Explore/earth-blue-marble.jpg')
      .backgroundImageUrl('/Earth-Explore/night-sky.png')
      .showGlobe(true)
      .showGraticules(true)
      .pointsData(samplePoints)
      .pointAltitude('size')
      .pointColor('color')
      .onPointClick((point: PointData) => {
        setSelectedPoint(point)
      })

    world.controls().autoRotate = true
    world.controls().autoRotateSpeed = 0.5
  }, [])

  return (
    <>
      <div
        ref={globeRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'black',
          overflow: 'hidden'
        }}
      />
      {selectedPoint && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '10px 15px',
            borderRadius: '10px',
            zIndex: 10
          }}
        >
          <div><strong>{selectedPoint.name}</strong></div>
          <div>Lat: {selectedPoint.lat}</div>
          <div>Lng: {selectedPoint.lng}</div>
          <button
            onClick={() => setSelectedPoint(null)}
            style={{ marginTop: '8px', background: '#333', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
          >
            Close
          </button>
        </div>
      )}
    </>
  )
}
