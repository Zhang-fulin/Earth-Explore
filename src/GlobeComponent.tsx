import { useEffect, useRef, useState} from 'react'
import Globe from 'globe.gl'
import { supabase } from './supabase'
import { startOfDay } from 'date-fns';


type News = {
  id: string;
  title: string;
  context: string;
  time:string;
  lat:number;
  lon:number;
};


export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)

  const [news, setNews] = useState<News[]>([]);

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

    async function fetchNews() {
      const currentDateISOString = startOfDay(new Date()).toISOString();
  
      const { data, error } = await supabase
        .from<'news', News>('news')
        .select('*')
        .gte('time', currentDateISOString);
  
      if (error) {
        console.error('加载失败:', error.message);
      } else {
        setNews(data);
      }
    }
  
    fetchNews();
  
    const intervalId = setInterval(fetchNews, 5*60 * 1000); // 每5分钟调用一次
  
    return () => {
      clearInterval(intervalId); // 清除定时器，避免内存泄露
    };

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