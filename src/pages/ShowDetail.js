import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_KEY, API_URL, IMAGE_URL_SHOW } from '../config';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './ShowDetail.module.css';
import Genre from '../components/ShowDetail/Genre';
import Streaming from '../components/ShowDetail/Streaming';
import YoutubeEmbed from '../components/ShowDetail/YoutubeEmbed';

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
    genres: data.genres,
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
      <div className={classes['show-info']}>
        <h1>{show.name}</h1>
        <div className={classes['show-info-card']}>
          <span>Seasons: {show.seasons}</span>
          <span>
            • {show.premiered?.substring(0, 4)} -{' '}
            {show.ended()?.substring(0, 4) || ''}
          </span>
          {show.runtime() && <span> • {show.runtime()} minutes</span>}
        </div>
      </div>

      {/* Score */}
      <div className={classes.score}>
        <i className="fa fa-star" aria-hidden="true"></i>
        <h2>{show.score}</h2>
      </div>

      {/* Media (Image and Video) */}
      <div className={classes.media}>
        <div className={classes.img}>
          <img src={IMAGE_URL_SHOW + show.image} alt={show.name} />
        </div>
        <div className={classes['video-wrapper']}>
          <YoutubeEmbed id={show.id} />
        </div>
      </div>

      <div className={classes.summary}>
        <span>{show.summary}</span>
      </div>

      <Genre genres={show.genres} />

      {/* Streaming container */}
      <div className={classes['streaming-container']}>
        <Streaming id={show.id} />
      </div>
    </div>
  );
};

export default ShowDetail;
