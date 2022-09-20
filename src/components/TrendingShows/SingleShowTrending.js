import { Fragment } from 'react';

import { IMAGE_URL_RES } from '../../config';
import classes from './TopShowTrending.module.css';

const SingleShowTrending = props => {
  return (
    <Fragment>
      <div className={`${classes.show} ${classes.image}`}>
        <a href={props.id}>
          <img src={IMAGE_URL_RES + props.image} alt={props.name} />
        </a>
      </div>
      <div className={`${classes.show} ${classes.content}`}>
        <h3>{props.name}</h3>
        <p>
          <span>Score: </span>
          {props.score}
        </p>
      </div>
    </Fragment>
  );
};

export default SingleShowTrending;
