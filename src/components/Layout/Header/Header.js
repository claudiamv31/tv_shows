import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import HeaderForm from './HeaderForm';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <Link to={'/'}>
          <h1 className={classes.icon}>Clavtv</h1>
        </Link>
        <HeaderForm />
      </header>
    </Fragment>
  );
};

export default Header;
