import SingleShowTrending from './SingleShowTrending';

import classes from './ListShowsTrending.module.css';

const ListShowsTrending = props => {
  return (
    <li className={classes['top-show']}>
      <SingleShowTrending
        number={props.number}
        id={props.id}
        image={props.image}
        score={props.score}
        name={props.name}
      />
    </li>
  );
};

export default ListShowsTrending;
