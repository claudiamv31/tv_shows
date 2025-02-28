import { useLocation } from 'react-router-dom';
import SingleShow from '../components/results/SingleShow';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './ListShows.module.css';

const ListShows = () => {
  const location = useLocation();
  const state = location.state || {};

  if (state.isLoading) {
    return <LoadingSpinner />;
  }

  if (state.httpError) {
    return (
      <section className={classes.error}>
        <p>{state.error}</p>
      </section>
    );
  }

  return (
    <div className={classes.single}>
      <h1>Titles</h1>
      <ul>
        {state.results?.length > 0 ? (
          state.results.map(show => (
            <SingleShow
              key={show.id}
              id={show.id}
              name={show.name}
              image={show.image}
              year={show.year}
              actors={show.actors}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>
    </div>
  );
};

export default ListShows;
