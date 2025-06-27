import { useEffect, useRef } from 'react';
import './message-detail.css';
import 'react-resizable/css/styles.css';
import { News } from '../types';
import DOMPurify from 'dompurify';
import { ResizableBox, Resizable } from 'react-resizable';

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
    <div ref={ref} className="message-detail-container">
      <ResizableBox
          width={500}
          height={500}
          resizeHandles={['s']}
          axis="y"
          className='message-detail-container-resize'
          minConstraints={[0, 100]} 
        >
          <div className="message-detail">
            <h3>{news.title}</h3>
            <h4>{news.info}</h4>
            <div className='message-detail-content'
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.content) }}
            />
          </div> 
      </ResizableBox>
    </div>
  );
}
