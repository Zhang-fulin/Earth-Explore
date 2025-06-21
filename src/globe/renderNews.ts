import { News } from '../types';
import { MessagePreview } from '../message/message-preview';

export function renderNews(
  world: any,
  news: News[],
  onClick: (n: News) => void
) {
  world
    .htmlElementsData(news)
    .htmlElement((d: News) => {
      const el = document.createElement('div');
      el.className = 'globe-message-box';
      el.innerHTML = MessagePreview(d);

      el.style.width = '100px';
      el.style.transition = 'opacity 250ms';
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';

      el.onclick = (e) => {
        e.stopPropagation();
        onClick(d);
      };

      return el;
    })
    .htmlLat((d: News) => d.lat)
    .htmlLng((d: News) => d.lon)
    .htmlElementVisibilityModifier((el: HTMLElement, isVisible: boolean) => {
      el.style.visibility = isVisible ? 'visible' : 'hidden';
    });
}