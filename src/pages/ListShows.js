import { useLocation } from 'react-router-dom';
import SingleShow from '../components/results/SingleShow';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './ListShows.module.css';

const ListShows = () => {
  const location = useLocation();
  console.log(location);

  if (location.state.isLoading) {
    return <LoadingSpinner />;
  }

  if (location.state.httpError) {
    return (
      <section className={classes.error}>
        <p>{location.state.error}</p>
      </section>
    );
  }

  if (!location.state.httpError && !location.state.isLoading) {
    return (
      <ul className={classes.list}>
        {location.state.map(show => (
          <SingleShow
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image}
          />
        ))}
      </ul>
    );
  }
};

export default ListShows;
