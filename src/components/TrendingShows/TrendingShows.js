import TopShow from './TopShow';

import classes from './TrendingShows.module.css';

const TrendingShows = props => {
  return (
    <li className={classes['top-show']}>
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
