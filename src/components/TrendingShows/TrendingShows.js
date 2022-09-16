import TopShow from './TopShow';

const TrendingShows = props => {
  return (
    <li>
      <TopShow
        key={props.id}
        id={props.id}
        image={props.image}
        score={props.score}
        name={props.name}
      />
    </li>
  );
};

export default TrendingShows;
