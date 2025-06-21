import { useRef, useState } from 'react'
import { useGlobe } from './useGlobe'
import { News } from '../types';
import { MessageDetail } from '../message/message-detail';

export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  useGlobe(globeRef, setSelectedNews);
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
    >
        {selectedNews && (
            <MessageDetail news={selectedNews} onClose={() => setSelectedNews(null)} />
        )}
    </div>    
  )
}
