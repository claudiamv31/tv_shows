import React, { Fragment } from 'react';

import classes from './Header.module.css';
import HeaderForm from './HeaderForm';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Clavtv</h1>
        <HeaderForm />
      </header>
    </Fragment>
  );
};

export default Header;
