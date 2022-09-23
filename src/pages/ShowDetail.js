import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_KEY, API_URL, IMAGE_URL_SHOW } from '../config';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './ShowDetail.module.css';

const ShowDetail = () => {
  const params = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const { showId } = params;

  useEffect(() => {
    const fetchShowDetail = async () => {
      const response = await fetch(`${API_URL}tv/${showId}?api_key=${API_KEY}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const reponseData = await response.json();
      //   console.log('data + ' + reponseData);

      return reponseData;
    };
    const fetchData = async () => {
      const results = await fetchShowDetail();
      setData(results);
      setIsLoading(false);
    };
    fetchData().catch(error => {
      console.log(error);
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [showId]);

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

  const show = {
    id: data.id,
    name: data.name,
    image: data?.poster_path,
    imageBig: data?.backdrop_path,
    seasons: data.number_of_seasons,
    score: data.vote_average,
    summary: data.overview,
    premiered: data.first_air_date,
    ended() {
      if (data.status === 'Ended') {
        return data.last_air_date;
      } else {
        return '';
      }
    },
    runtime() {
      if (data.episode_run_time?.length === 0) {
        return '';
      }
      if (data.episode_run_time?.length > 1) {
        return data.episode_run_time[0] + ' - ' + data.episode_run_time[1];
      } else {
        return data.episode_run_time + ' ';
      }
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.img}>
        <img src={IMAGE_URL_SHOW + show.image} alt={show.name} />
      </div>
      <div className={classes['show-info']}>
        <h1>{show.name}</h1>
        <div className={classes['show-summary-info']}>
          <h2>
            {show.premiered?.substring(0, 4)} -{' '}
            {show.ended() !== '' ? show.ended().substring(0, 4) : ''}
          </h2>
          <span className={classes.summary}>{show.summary}</span>
        </div>
        {show.runtime() !== '' ? (
          <div>
            <span>Duration: </span>
            <span>
              {show.runtime()}
              minutes
            </span>
          </div>
        ) : (
          ''
        )}
        <div>
          <span>Seasons: </span>
          <span>{show.seasons}</span>
        </div>
        {/* <div class="show__genre-content">
          <span class="show__grenre-title">Genre: </span>
          <ul class="show__genre-list">
            {this._data.genres.map(this._generateMarkupGenre).join('')}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default ShowDetail;
