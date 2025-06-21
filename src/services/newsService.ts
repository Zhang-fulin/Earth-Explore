import { supabase } from '../supabase'
import { News } from '../types'

export async function fetchTodayNews(): Promise<News[]> {
  const now = new Date();
  const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const currentDateISOString = startOfDay.toISOString();
  const { data, error } = await supabase
    .from('cctv-news')
    .select('*')
    .gte('time', currentDateISOString);

  if (error) {
    console.error('加载新闻失败:', error.message);
    return [];
  }

  const uniqueMap = new Map<string, News>();
  data.forEach(item => {
    if (!uniqueMap.has(item.content)) {
      uniqueMap.set(item.content, item);
    }
  });

  return Array.from(uniqueMap.values());
}
