import { Link } from 'react-router-dom';
import { IMAGE_URL_RES, NO_PIC } from '../../config';
import classes from './SingleShow.module.css';

const SingleShow = props => {
  return (
    <Link to={`${props.id}`} className={classes['show-search']}>
      <li>
        <div className={classes.container}>
          <div className={classes.image}>
            <img
              src={props.image !== '' ? IMAGE_URL_RES + props.image : NO_PIC}
              alt={props.name}
            />
          </div>
          <div className={classes.info}>
            <p className={classes.name}>
              <strong>{props.name}</strong>
            </p>
            <p className={classes.details}>{props.year}</p>
            <p>
              {props?.actors.map((actor, index) =>
                index === props.actors.length - 1 ? actor : `${actor}, `
              )}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default SingleShow;
