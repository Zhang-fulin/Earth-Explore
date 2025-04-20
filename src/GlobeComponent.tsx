import { useEffect, useRef} from 'react'
import Globe from 'globe.gl'
import { supabase } from './supabase'
import { startOfDay } from 'date-fns';
import { FontLoader } from 'three-stdlib';

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

  // const [news, setNews] = useState<News[]>([]);
  

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

    // fetch('/Earth-Explore/submarine-cables.json').then(r => r.json()).then(cablesGeo => {
    //   let cablePaths:any[] = [];
    //   cablesGeo.features.forEach(({ geometry, properties }:any) => {
    //     geometry.coordinates.forEach((coords:any) => cablePaths.push({ coords, properties }));
    //   });

    //   world
    //     .pathsData(cablePaths)
    //     .pathPoints('coords')
    //     .pathPointLat((p:any) => p[1])
    //     .pathPointLng((p:any) => p[0])
    //     .pathColor((path:any) => path.properties.color)
    //     .pathDashLength(0.1)
    //     .pathStroke(1)
    //     .pathDashGap(0.008)
    //     .pathDashAnimateTime(10000);
    // });

    const loader = new FontLoader();
    loader.load('/Earth-Explore/font.json', (font:any) => {
      fetch('/Earth-Explore/city.json')
        .then((res) => res.json())
        .then((city) => {
          world
            .labelsData(city)
            .labelTypeFace(font.data) // 传递字体对象，而不是路径
            .labelLat((d: any) => d.latitude)
            .labelLng((d: any) => d.longitude)
            .labelText((d: any) => d.name)
            .labelAltitude(0.01)
            .labelSize(0.3)
            .labelDotRadius(0.2)
            .labelColor(() => 'rgba(0, 255, 60, 0.75)')
            .labelResolution(4);
        });
    });


    async function fetchNews() {
      const currentDateISOString = startOfDay(new Date()).toISOString();
  
      const { data, error } = await supabase
        .from<'news', News>('news')
        .select('*')
        .gte('time', currentDateISOString);
  
      if (error) {
        console.error('加载失败:', error.message);
      } else {
        console.log(data);
      }
    }
  
    fetchNews();
  
    const intervalId = setInterval(fetchNews, 5*60 * 1000);
  
    return () => {
      clearInterval(intervalId);
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