export function WatchedMovie({
  movie,
  onRemoveMovieInWatchedStatePlusMoveBack,
}) {
  return (
    <li style={{ position: "relative" }}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "2.3rem",
          right: "1rem",
          borderRadius: "50%",
          height: "3rem",
          aspectRatio: "1",
          cursor: "pointer",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1rem",
        }}
        onClick={() => onRemoveMovieInWatchedStatePlusMoveBack(movie.imdbID)}
      >
        X
      </button>
    </li>
  );
}
