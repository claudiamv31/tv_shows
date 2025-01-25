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
      /* try {
        let response = await fetch(`${API_SERVICE_URL}`);
        if (!response.ok) throw new Error('Primary API is unavailable');

        let responseData = await response.json();
        if (!responseData || responseData.length === 0)
          throw new Error('Primary API returned empty data');

        setTopShows(formatShowsData(responseData));
      } catch (error) {
        console.error('Primary API failed:', error.message);*/
      try {
        const fallbackResponse = await fetch(
          `${API_URL}trending/tv/week?api_key=${API_KEY}`
        );
        if (!fallbackResponse.ok)
          throw new Error('Fallback API is unavailable');

        let fallbackData = await fallbackResponse.json();
        if (fallbackData && fallbackData.results) {
          setTopShows(formatShowsData(fallbackData.results));
        } else {
          throw new Error('Fallback API returned empty data');
        }
      } catch (fallbackError) {
        console.error('Fallback API failed:', fallbackError.message);
        setHttpError(fallbackError.message);
      }
      // } finally {
      setIsLoading(false);
    };
    //};

    fetchTrendingShows();
  }, []);

  const formatShowsData = data => {
    return data.map((show, index) => ({
      id: show.id,
      name: show.name,
      overview: show.overview,
      image: show.poster_path,
      score: show.vote_average,
      number: index,
    }));
  };

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
    .slice(0, NUM_SHOWS_TRENDING)
    .map(show => <ListShowsTrending key={show.id} show={show} />);

  return (
    <div className={classes.trending}>
      <h1>Trending Tv Shows</h1>
      <ul>{showsList}</ul>
    </div>
  );
};

export default TrendingShows;
