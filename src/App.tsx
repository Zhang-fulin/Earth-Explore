import { useEffect, useState } from 'react';
import GlobeComponent from "./globe/GlobeComponent"
import BottomTimePanel from "./components/BottomTimePanel"
import BottomSourcePanel from './components/BottomSourcePanel';
import { fetchTodayNews } from "./services/newsService"
import { NewsSourceDict } from './types';
import { News } from './types';

// if (import.meta.env.DEV) {
//   import('./debug.css');
// }

function App() {

  const [allNews, setAllNews] = useState<News[]>([]);
  const [utcHour, setUtcHour] = useState<number>(new Date().getUTCHours());
  const [newsSource, setNewsSource] = useState<string>('CCTV');
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

  function filterNewsByUtcHour(newsList: News[], targetHour: number, newsSource: string): News[] {

    if (newsSource === "ALL") {
        return allNews
    }

    return newsList.filter(item => {
      return newsSource === item.source;
    });
  }

  useEffect(() => {
    const filtered = filterNewsByUtcHour(allNews, utcHour, newsSource);
    setFilteredNews(filtered);
  }, [allNews, utcHour, newsSource]);



  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <GlobeComponent news={filteredNews}/> 
      {/* <BottomTimePanel
        onHourChange={(utc_Hour) => {
          setUtcHour(utc_Hour);
        }}
      /> */}
      <BottomSourcePanel
        onSourceChange={(source) => {
          setNewsSource(source)
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
  )
}

export default App
