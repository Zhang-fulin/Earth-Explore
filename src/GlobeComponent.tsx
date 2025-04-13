import { useEffect, useRef} from 'react'
import Globe from 'globe.gl'



export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)


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
    </>
  )
}


// d8bd9053c6634c759e1824804ed8fdf2

// https://api.twelvedata.com/market_state?code=XSHE&apikey=d8bd9053c6634c759e1824804ed8fdf2