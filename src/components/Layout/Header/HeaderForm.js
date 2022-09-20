import React, { useState } from 'react';
import { API_KEY, API_URL } from '../../../config';

import classes from './HeaderForm.module.css';

const HeaderForm = () => {
  const [enteredShow, setEnteredShow] = useState('');

  const showChangeHandler = event => {
    setEnteredShow(event.target.value);
  };

  const searchShowHandler = async event => {
    event.preventDefault();

    console.log(enteredShow);

    const response = await fetch(
      `${API_URL}search/tv?api_key=${API_KEY}&query=${enteredShow}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const responseData = await response.json();

    console.log(responseData);
  };

  return (
    <form className={classes.form} onSubmit={searchShowHandler}>
      <input
        className={classes.input}
        type="text"
        onChange={showChangeHandler}
      />
      <button className={classes.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default HeaderForm;
