import { useEffect, useRef } from 'react';
import './message-detail.css'
import { News } from '../types';

export function MessageDetail({ news, onClose }: { news: News; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="message-detail" ref={ref}>
      <h3>{news.title}</h3>
      <p>{news.content}</p>
    </div>
  );
}