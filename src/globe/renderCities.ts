import { FontLoader } from 'three-stdlib';
import cityData from '../assets/city.json';
import fontData from '../assets/font_filtered_by_cities.json';

export function renderCities(world: any) {
  const loader = new FontLoader();
  const font = loader.parse(fontData as any);

  world
    .labelsData(cityData)
    .labelTypeFace(font.data)
    .labelLat((d: any) => d.latitude)
    .labelLng((d: any) => d.longitude)
    .labelText((d: any) => d.name)
    .labelAltitude(0.001)
    .labelSize(0.3)
    .labelDotRadius(0.2)
    .labelColor(() => 'rgba(0,255,255,0.9)')
    .labelResolution(4);
}
