import { useEffect } from 'react';
import { setupGlobe } from './setupGlobe';
import { renderCities } from './renderCities';
import { renderNews } from './renderNews';
import { News } from '../types';
import { fetchTodayNews } from '../services/newsService';

export function useGlobe(
  globeRef: React.RefObject<HTMLDivElement | null>,
  onNewsClick: (news: News) => void
) {
  useEffect(() => {
    if (!globeRef.current) return;
    const world = setupGlobe(globeRef.current);
    renderCities(world);

    const fetchAndRenderNews = async () => {
      const news = await fetchTodayNews();
      renderNews(world, news, onNewsClick);
    };

    fetchAndRenderNews();
    const intervalId = setInterval(fetchAndRenderNews, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [globeRef, onNewsClick]);
}
