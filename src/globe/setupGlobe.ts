import Globe from 'globe.gl';

export function setupGlobe(container: HTMLDivElement) {
  const world = Globe()(container, {
    rendererConfig: { antialias: true, logarithmicDepthBuffer: true }
  });

  world
    .globeImageUrl('earth-blue-marble.jpg')
    .backgroundImageUrl('night-sky.png')
    .showGlobe(true)
    .showGraticules(true);

  world.controls().autoRotate = true;
  world.controls().autoRotateSpeed = 1;

  return world;
}
