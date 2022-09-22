import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_KEY, API_URL, IMAGE_URL_SHOW } from '../config';

const ShowDetail = () => {
  const params = useParams();
  const [data, setData] = useState({});

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
      console.log(results);
      setData(results);
    };
    fetchData();
  }, [showId]);

  //   console.log(data);

  const show = {
    id: data.id,
    name: data.name,
    image: data?.poster_path,
    seasons: data.number_of_seasons,
    score: data.vote_average,
    summary: data.overview,
    premiered: data.first_air_date,
    ended: data.last_air_date,
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

  //   console.log(show);

  return (
    <div>
      <div>
        <img src={IMAGE_URL_SHOW + show.image} alt={show.name} />
      </div>
      <div>
        <h1>{show.name}</h1>
        <div class="show__summary">
          <h3 class="premiered-ended">
            {show.premiered?.substring(0, 4)} -{' '}
            {show.ended !== undefined ? show.ended?.substring(0, 4) : ''}
          </h3>
          <span class="show__summary-data">{show.summary}</span>
        </div>
        {show.runtime() !== '' ? (
          <div class="show__runtime-content">
            <span class="show__runtime-title">Duration: </span>
            <span>
              {show.runtime()}
              minutes
            </span>
          </div>
        ) : (
          ''
        )}
        <div class="show__seasons-content">
          <span class="show__seasons-title">Seasons: </span>
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
