import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import ListShowsTrending from '../components/TrendingShows/ListShowsTrending';
import {
  API_KEY,
  API_URL,
  NUM_SHOWS_TRENDING,
  API_SERVICE_URL,
} from '../config';
import classes from './TrendingShows.module.css';

const TrendingShows = () => {
  const [topShows, setTopShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      let response = await fetch(`${API_SERVICE_URL}`);
      let responseData = await response.json();

      console.log(responseData);

      if (!response.ok || !responseData || responseData.length === 0) {
        response = await fetch(`${API_URL}trending/tv/week?api_key=${API_KEY}`);
        responseData = await response.json();

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        if (responseData && responseData.results) {
          responseData = responseData.results;
        } else {
          throw new Error('No trending data available');
        }
      }

      const topShows = [];

      for (const key in responseData) {
        topShows.push({
          key: key,
          id: responseData[key].id,
          name: responseData[key].name,
          overview: responseData[key].overview,
          image: responseData[key].poster_path,
          score: responseData[key].vote_average,
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
        overview={show.overview}
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
