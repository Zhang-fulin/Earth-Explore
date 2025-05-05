import { useEffect, useRef } from 'react'
import Globe from 'globe.gl'
import { supabase } from './supabase'
import { startOfDay } from 'date-fns';
import { FontLoader } from 'three-stdlib';

type News = {
  id: string;
  title: string;
  content: string;
  time: string;
  lat: number;
  lon: number;
};

const version = '1.0.0'
export default function GlobeComponent() {
  const globeRef = useRef<HTMLDivElement>(null)
  
  // const [news, setNews] = useState<News[]>([]);
 
  console.log("version", version)
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

    // world.controls().autoRotate = true
    // world.controls().autoRotateSpeed = 0.5
    
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
    loader.load('/Earth-Explore/font.json', (font: any) => {
      fetch('/Earth-Explore/city.json')
        .then((res) => res.json())
        .then((city) => {
          world
            .labelsData(city)
            .labelTypeFace(font.data)
            .labelLat((d: any) => d.latitude)
            .labelLng((d: any) => d.longitude)
            .labelText((d: any) => d.name)
            .labelAltitude(0.005)
            .labelSize(0.3)
            .labelDotRadius(0.1)
            .labelColor(() => 'rgba(0, 255, 60, 0.75)')
            .labelResolution(4);
        });
    });

    const MessageBox = (d: News) => `
  <div class="globe-message-box" style="
    position: relative;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1.5px solid rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 12px;
    max-width: 240px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    word-wrap: break-word;
    overflow-wrap: break-word;
    transform-origin: center center;
    user-select: none;
    -webkit-user-select: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  ">
    <div style="
      font-weight: 600;
      font-size: 12px;
      color: #222;
      margin-bottom: 6px;
      line-height: 1.4;
    ">
      ${d.title || '无标题'}
    </div>
    <div style="
      font-size: 9px;
      color: #444;
      line-height: 1.6;
    ">
      ${d.content || '无内容'}
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
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    "></div>
  </div>
`;

    async function fetchNews() {
      const currentDateISOString = startOfDay(new Date()).toISOString();

      const { data, error } = await supabase
        .from<'today-news', News>('today-news')
        .select('*')
        .gte('time', currentDateISOString);

      if (error) {
        console.error('加载失败:', error.message);
      } else {
        const uniqueDataMap = new Map();
        data.forEach((item: News) => {
          if (!uniqueDataMap.has(item.content)) {
            uniqueDataMap.set(item.content, item);
          }
        });
        const dedupedData = Array.from(uniqueDataMap.values());

        world
          .htmlElementsData(dedupedData)
          .htmlElement((d: any) => {
            const el = document.createElement('div');
            el.innerHTML = MessageBox(d);
            el.style.width = `100px`;
            el.style.transition = 'opacity 250ms';
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';
            el.onclick = () => { console.info(d); };
            return el;
          })
          // .htmlAltitude(0.05)
          .htmlLat((d: News) => d.lat)
          .htmlLng((d: News) => d.lon)
          .htmlElementVisibilityModifier((el: any, isVisible: Boolean) => el.style.visibility = isVisible ? 'visible' : 'hidden');

        // const gData = data.map((d: News) => ({
        //   lat: d.lat,
        //   lng: d.lon,
        //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
        // }));

        // world
        //   .pointsData(gData)
        //   .pointAltitude(0.01)
        //   .pointColor('color');
      }
    }

    fetchNews();
    const intervalId = setInterval(fetchNews, 5 * 60 * 1000);

    // 👇 缩放控制 message box 大小
    const camera = world.camera();

    function updateMessageBoxScale() {
      const distance = camera.position.length(); // 距离原点距离
      const scale = Math.min(1, Math.max(0.3, distance / 30)); // 缩放范围限定
      document.querySelectorAll('.globe-message-box').forEach(el => {
        (el as HTMLElement).style.transform = `scale(${scale})`;
      });
    }

    let animationFrameId: number;
    function animate() {
      updateMessageBoxScale();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate(); // 启动持续缩放更新

    return () => {
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [])

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
