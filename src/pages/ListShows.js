import { useLocation } from 'react-router-dom';
import SingleShow from '../components/results/SingleShow';

const ListShows = () => {
  const location = useLocation();
  console.log(location);

  return (
    <ul>
      {location.state.map(show => (
        <SingleShow
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image}
        />
      ))}
      ;
    </ul>
  );
};

export default ListShows;
