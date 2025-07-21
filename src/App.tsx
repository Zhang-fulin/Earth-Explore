import { useEffect, useState } from 'react';
import GlobeComponent from "./globe/GlobeComponent";
import BottomTimePanel from "./components/BottomTimePanel";
import { fetchTodayNews } from "./services/newsService";
import { News } from './types';

function App() {
  const [allNews, setAllNews] = useState<News[]>([]);
  const [utcHour, setUtcHour] = useState<number>(new Date().getUTCHours());
  const [visibleNews, setVisibleNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchAndSetNews = () => {
      fetchTodayNews()
        .then(setAllNews)
        .catch(() => setAllNews([]));
    };

    fetchAndSetNews();
    const intervalId = setInterval(fetchAndSetNews, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  function getRandomNewsSubset(newsList: News[], maxCount: number): News[] {
    const shuffled = [...newsList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(maxCount, shuffled.length));
  }

  useEffect(() => {
    const filtered = getRandomNewsSubset(allNews, 5);
    setVisibleNews(filtered);
  }, [allNews, utcHour]);


  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <GlobeComponent news={visibleNews} />

      <BottomTimePanel
        onHourChange={(utc_Hour) => {
          setUtcHour(utc_Hour);
        }}
      />

      {/* {import.meta.env.DEV && (
        <>
          <div className="debug-line top-6"></div>
          <div className="debug-line bottom-5-40px"></div>
          <div className="debug-line center-50"></div>
          <div className="debug-line bottom-6"></div>
        </>
      )} */}
    </div>
  );
}

export default App;
