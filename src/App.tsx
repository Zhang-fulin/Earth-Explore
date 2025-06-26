import { useEffect, useState } from 'react';
import GlobeComponent from "./globe/GlobeComponent"
import BottomTimePanel from "./components/BottomTimePanel"
import { fetchTodayNews } from "./services/newsService"
import { News } from './types';

function App() {

  const [allNews, setAllNews] = useState<News[]>([]);
  const [utcHour, setUtcHour] = useState<number>(new Date().getUTCHours());
  const [filteredNews, setFilteredNews] = useState<News[]>([]);

  useEffect(() => {

    const fetchAndSetNews = () => {
      fetchTodayNews()
        .then(setAllNews)
        .catch(() => setAllNews([]));
    };

    fetchAndSetNews();
    const intervalId = setInterval(fetchAndSetNews, 5 * 60 * 1000);
   
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function filterNewsByUtcHour(newsList: News[], targetHour: number): News[] {
    return newsList.filter(item => {
      const itemHour = new Date(item.time).getUTCHours();
      return itemHour === targetHour;
    });
  }

  useEffect(() => {
    const filtered = filterNewsByUtcHour(allNews, utcHour);
    setFilteredNews(filtered);
  }, [allNews, utcHour]);



  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <GlobeComponent news={filteredNews}/> 
      <BottomTimePanel
        onHourChange={(utc_Hour) => {
          setUtcHour(utc_Hour);
        }}
      />
    </div>
  )
}

export default App
