import { useEffect, useRef} from 'react'
import Globe from 'globe.gl'
import { supabase } from './supabase'
import { startOfDay } from 'date-fns';
import { FontLoader } from 'three-stdlib';
import { da } from 'date-fns/locale';

type News = {
  id: string;
  title: string;
  content: string;
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
            .labelAltitude(0.005)
            .labelSize(0.3)
            .labelDotRadius(0.2)
            .labelColor(() => 'rgba(0, 255, 60, 0.75)')
            .labelResolution(4);
        });
    });


    const MessageBox = (d:News) => `
    <div style="
      position: relative;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      padding: 12px;
      max-width: 240px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    ">
      <div style="
        font-weight: 600;
        font-size: 15px;
        color: #222;
        margin-bottom: 8px;
        line-height: 1.4;
      ">
        ${d.title || '无标题'}
      </div>
      <div style="
        font-size: 13px;
        color: #444;
        line-height: 1.6;
      ">
        ${d.content || '无内容sssssssssssssssssssssssssssssssssssssss'}
      </div>
      <div style="
        position: absolute;
        bottom: -10px;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid rgba(255, 255, 255, 0.6);
      "></div>
    </div>
  `;

  const N = 30;
  const gData = [...Array(N).keys()].map(() => ({
    lat: (Math.random() - 0.5) * 180,
    lng: (Math.random() - 0.5) * 360,
    size: 7 + Math.random() * 30,
    color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  }));

  console.log(gData);

    async function fetchNews() {
      const currentDateISOString = startOfDay(new Date()).toISOString();
  
      const { data, error } = await supabase
        .from<'news', News>('news')
        .select('*')
        .gte('time', currentDateISOString);
  
      if (error) {
        console.error('加载失败:', error.message);
      } else {
        
        world
          .htmlElementsData(data)
          .htmlElement((d:any) => {
            const el = document.createElement('div');
            el.innerHTML = MessageBox(d);
            el.style.width = `100px`;
            el.style.transition = 'opacity 250ms';
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.onclick = () => { console.info(d); };
            return el;
          })
          .htmlAltitude(0.05)
          .htmlLat((d: News) => d.lat)
          .htmlLng((d: News) => d.lon)
          .htmlElementVisibilityModifier((el:any, isVisible:Boolean) => el.style.opacity = isVisible ? 1 : 0);

          const gData = data.map((d:News) => ({
            lat: d.lat,
            lng: d.lon,
            color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
          }));
          
          world 
            .pointsData(gData)
            .pointAltitude(0.01)
            .pointColor('color');  

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