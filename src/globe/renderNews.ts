import { fetchTodayNews } from '../services/newsService';
import { MessagePreview } from '../message/message-preview';
import { News } from '../types';

export async function renderNews(world: any) {
  const news = await fetchTodayNews();

  world
    .htmlElementsData(news)
    .htmlElement((d: any) => {
      const el = document.createElement('div');
      el.innerHTML = MessagePreview(d);
      el.style.width = `100px`;
      el.style.transition = 'opacity 250ms';
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
      el.className = 'globe-message-box';
      el.onclick = () => console.info(d);
      return el;
    })
    .htmlLat((d: News) => d.lat)
    .htmlLng((d: News) => d.lon)
    .htmlElementVisibilityModifier((el:any, isVisible:any) => {
      el.style.visibility = isVisible ? 'visible' : 'hidden';
    });
}
