import { Link } from 'react-router-dom';

import { IMAGE_URL_RES } from '../../config';
import classes from './SingleShowTrending.module.css';

const SingleShowTrending = props => {
  return (
    <Link to={`/shows/${props.id}`} className={classes.tv}>
      <div className={classes.image}>
        <img src={IMAGE_URL_RES + props.image} alt={props.name} />
      </div>
      <div className={classes.content}>
        <div className={classes.top}>{Number(props.number) + 1}</div>
        <div className={classes.name}>
          <div>{props.overview}</div>
          <h3>{props.name}</h3>
        </div>
        <div className={classes.score}>
          <i className="fa fa-star"></i>
          <p>{props.score}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleShowTrending;
