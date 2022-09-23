import { Link } from 'react-router-dom';

import { IMAGE_URL_RES } from '../../config';
import classes from './SingleShow.module.css';

const SingleShow = props => {
  return (
    <Link to={`${props.id}`} className={classes['show-search']}>
      <li>
        <div className={classes.image}>
          <img src={IMAGE_URL_RES + props.image} alt={props.name} />
        </div>
        <div className={classes.name}>
          <p>{props.name}</p>
        </div>
      </li>
    </Link>
  );
};

export default SingleShow;
