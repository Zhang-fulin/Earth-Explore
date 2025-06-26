import { useEffect, useRef } from 'react';
import { setupGlobe } from './setupGlobe';
import { renderCities } from './renderCities';
import { renderNews } from './renderNews';
import { News } from '../types';

export function useGlobe(
  globeRef: React.RefObject<HTMLDivElement | null>,
  news: News[],
  onNewsClick: (news: News) => void
) {
  const worldRef = useRef<ReturnType<typeof setupGlobe> | null>(null);
  useEffect(() => {
    if (!globeRef.current || worldRef.current) return;

    const world = setupGlobe(globeRef.current);
    renderCities(world);
    worldRef.current = world;
  }, [globeRef]);

  useEffect(() => {
    if (!worldRef.current) return;
    renderNews(worldRef.current, news, onNewsClick);
  }, [news, onNewsClick]);
}
