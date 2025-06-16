import { useEffect } from 'react';
import { setupGlobe } from './setupGlobe';
import { renderCities } from './renderCities';
import { renderNews } from './renderNews';

export function useGlobe(globeRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!globeRef.current) return;

    const world = setupGlobe(globeRef.current);
    renderCities(world);

    const fetchAndRenderNews = async () => {
      await renderNews(world);
    };

    fetchAndRenderNews();
    const intervalId = setInterval(fetchAndRenderNews, 5 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [globeRef]);
}
