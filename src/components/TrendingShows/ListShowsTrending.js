import SingleShowTrending from './SingleShowTrending';

import classes from './ListShowsTrending.module.css';

const ListShowsTrending = show => {
  return (
    <li className={classes['top-show']}>
      <SingleShowTrending key={show.id} show={show} />
    </li>
  );
};

export default ListShowsTrending;
