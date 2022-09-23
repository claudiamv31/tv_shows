import { useLocation } from 'react-router-dom';
import SingleShow from '../components/results/SingleShow';
import classes from './ListShows.module.css';

const ListShows = () => {
  const location = useLocation();

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
};

export default ListShows;
