import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import ListShowsTrending from '../components/TrendingShows/ListShowsTrending';
import { API_KEY, API_URL, NUM_SHOWS_TRENDING } from '../config';
import classes from './TrendingShows.module.css';

const TrendingShows = () => {
  const [topShows, setTopShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      const response = await fetch(
        `${API_URL}trending/tv/week?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const reponseData = await response.json();

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
      setIsLoading(false);
    };

    fetchTrendingShows().catch(error => {
      console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    );
  }

  const showsList = topShows
    .filter(show => show.key < NUM_SHOWS_TRENDING)
    .map((show, index) => (
      <ListShowsTrending
        key={show.key}
        number={index}
        id={show.id}
        name={show.name}
        image={show.image}
        score={show.score}
      />
    ));

  return (
    <div className={classes.trending}>
      <h1>Trending Tv Shows</h1>
      <ul>{showsList}</ul>
    </div>
  );
};

export default TrendingShows;
