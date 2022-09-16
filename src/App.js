import { useEffect, useState } from 'react';
import Header from './components/Layout/Header/Header';
import TrendingShows from './components/TrendingShows/TrendingShows';
import { API_KEY, API_URL } from './config';

function App() {
  const [topShows, setTopShows] = useState([]);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      const response = await fetch(
        `${API_URL}trending/tv/week?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const reponseData = await response.json();
      console.log(reponseData);

      const topShows = [];

      for (const key in reponseData.results) {
        topShows.push({
          key: key,
          id: reponseData.results[key].id,
          name: reponseData.results[key].name,
          image: reponseData.results[key].backdrop_path,
          score: reponseData.results[key].vote_average,
        });
      }

      setTopShows(topShows);
    };

    fetchTrendingShows().catch(error => {
      console.log(error);
    });
  }, []);

  const showsList = topShows.map(show => (
    <TrendingShows
      key={show.key}
      id={show.id}
      name={show.name}
      image={show.image}
      score={show.score}
    />
  ));

  return (
    <div className="App">
      <Header />
      <ul>{showsList}</ul>
    </div>
  );
}

export default App;
