import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_KEY, API_URL } from '../../../config';

import classes from './HeaderForm.module.css';

const HeaderForm = () => {
  const [enteredShow, setEnteredShow] = useState('');
  const navigate = useNavigate();

  const showChangeHandler = event => {
    setEnteredShow(event.target.value);
  };

  const searchShowHandler = async event => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
          enteredShow
        )}&include_adult=false&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      if (!responseData.results || responseData.results.length === 0) {
        throw new Error('No results found');
      }

      const showDetails = await Promise.all(
        responseData.results.map(async show => {
          const creditsResponse = await fetch(
            `${API_URL}tv/${show.id}/credits?api_key=${API_KEY}`
          );
          const creditsData = await creditsResponse.json();

          return {
            id: show.id,
            name: show.name,
            year: show.first_air_date
              ? show.first_air_date.split('-')[0]
              : 'N/A',
            score: show.vote_average,
            image: show.poster_path ? show.poster_path : '',
            actors: creditsData.cast
              ? creditsData.cast.slice(0, 3).map(actor => actor.name)
              : [],
          };
        })
      );

      navigate('/shows', { state: { results: showDetails } });
    } catch (error) {
      navigate('/shows', { state: { httpError: true, error: error.message } });
    }
  };

  return (
    <form className={classes.form} onSubmit={searchShowHandler}>
      <input
        className={classes.input}
        type="text"
        value={enteredShow}
        onChange={showChangeHandler}
        placeholder="Search for a TV show..."
      />
      <button className={classes.button} type="submit">
        <i className="fa fa-search"></i>
        <p>Search</p>
      </button>
    </form>
  );
};

export default HeaderForm;
