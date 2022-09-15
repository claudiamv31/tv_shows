import React from 'react';

import classes from './HeaderForm.module.css';

const HeaderForm = () => {
  return (
    <form className={classes.form}>
      <input className={classes.input} type="text" />
      <button className={classes.button} type="submit">
        Search
      </button>
    </form>
  );
};

export default HeaderForm;
