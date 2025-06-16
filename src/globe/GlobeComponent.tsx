import { useRef } from 'react'
import { useGlobe } from './useGlobe'

export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null);
  useGlobe(globeRef);
  return (
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
  )
}
