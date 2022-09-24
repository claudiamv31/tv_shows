import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_KEY, API_URL } from '../../../config';

import classes from './HeaderForm.module.css';

const HeaderForm = () => {
  const [enteredShow, setEnteredShow] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let search = {};

  const showChangeHandler = event => {
    setEnteredShow(event.target.value);
  };

  const searchShowHandler = async event => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}search/tv?api_key=${API_KEY}&query=${enteredShow}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      search = responseData;
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setHttpError(true);
      setError(error.message);
    }
    console.log(search, httpError, isLoading);

    if (isLoading) {
      navigate('/shows', {
        state: { isLoading: isLoading },
      });
    }

    if (httpError) {
      navigate('/shows', {
        state: { httpError: httpError, error: error },
      });
    }

    if (!isLoading && !httpError) {
      navigate('/shows', {
        state: search.results.map(show => {
          return {
            id: show.id,
            name: show.name,
            language: show.original_language,
            score: show.vote_average,
            image: show.poster_path != null ? show.poster_path : '',
          };
        }),
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={searchShowHandler}>
      <input
        className={classes.input}
        type="text"
        onChange={showChangeHandler}
      />
      <button className={classes.button} type="submit">
        <i className="fa fa-search"></i>
        <p>Search</p>
      </button>
    </form>
  );
};

export default HeaderForm;
