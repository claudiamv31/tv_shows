const Genre = props => {
  const genres = props.genres.map(genre => {
    return <li key={genre.id}>{genre.name}</li>;
  });

  return (
    <>
      <p>Genres</p>
      <ul>{genres}</ul>
    </>
  );
};

export default Genre;
