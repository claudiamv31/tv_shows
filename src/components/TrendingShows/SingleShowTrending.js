import { Link } from 'react-router-dom';
import { IMAGE_URL_RES } from '../../config';
import classes from './SingleShowTrending.module.css';

const SingleShowTrending = ({ show }) => {
  function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '...' : str;
  }

  function financial(x) {
    return Number.parseFloat(x).toFixed(1);
  }

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
      <div className={classes.container}>
        <div className={classes.image}>
          <img src={imageUrl} alt={`${tvshow.name} Poster`} />
        </div>
        <div className={classes.details}>
          {rank && <div className={classes.top}>{rank}</div>}
          <div className={classes.name}>
            <h3>{tvshow.name}</h3>
          </div>
          <div className={classes.score}>
            <i className="fa fa-star" aria-hidden="true"></i>
            <p>{financial(tvshow.score)}</p>
          </div>
          <div className={classes.overview}>
            <p>{truncate(tvshow.overview, 200)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleShowTrending;
