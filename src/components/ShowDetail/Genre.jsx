import classes from './Genre.module.css';

const Genre = props => {
  const genres = props.genres.map((genre, index) => {
    return (
      <li key={genre.id}>
        {genre.name}
        {index < props.genres.length - 1 && (
          <span className={classes.dot}> • </span>
        )}
      </li>
    );
  });

  return (
    <div className={classes.genre}>
      <p>Genres</p>
      <ul>{genres}</ul>
    </div>
  );
};

export default Genre;
