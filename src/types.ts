export type News = {
  id: string;
  title: string;
  info: string;
  content: string;
  time: string;
  lat: number;
  lon: number;
  url: string;
  source: string;
};

type NewsSourceKey = "CCTV" | "CCTV_C";

export const NewsSourceDict: Record<NewsSourceKey, string> = {
  CCTV: "CCTV国际",
  CCTV_C: "CCTV国内",
};

export const newsSources = Object.keys(NewsSourceDict) as NewsSourceKey[];