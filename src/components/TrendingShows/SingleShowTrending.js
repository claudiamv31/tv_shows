import { Link } from 'react-router-dom';
import { IMAGE_URL_RES } from '../../config';
import classes from './SingleShowTrending.module.css';

const SingleShowTrending = ({ show }) => {
  if (!show) {
    return null; // or return a placeholder/loading component
  }

  const tvshow = show.show;

  const imageUrl = tvshow.image
    ? `${IMAGE_URL_RES}${tvshow.image}`
    : '/path/to/fallback-image.jpg';

  const rank = tvshow.number !== undefined ? Number(tvshow.number) + 1 : null;

  return (
    <Link
      to={`/shows/${tvshow.id}`}
      className={classes.tv}
      aria-label={`View details for ${tvshow.name}`}
    >
      <div className={classes.image}>
        <img src={imageUrl} alt={`${tvshow.name} Poster`} />
      </div>
      <div className={classes.content}>
        {rank && <div className={classes.top}>{rank}</div>}
        <div className={classes.name}>
          <h3>{tvshow.name}</h3>
        </div>
        <div className={classes.score}>
          <i className="fa fa-star" aria-hidden="true"></i>
          <p>{tvshow.score}</p>
        </div>
      </div>
      <div>{tvshow.overview}</div>
    </Link>
  );
};

export default SingleShowTrending;
