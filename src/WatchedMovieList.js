import { WatchedMovie } from "./WatchedMovie";

export function WatchedMovieList({
  watched,
  onRemoveMovieInWatchedStatePlusMoveBack,
}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveMovieInWatchedStatePlusMoveBack={
            onRemoveMovieInWatchedStatePlusMoveBack
          }
        />
      ))}
    </ul>
  );
}
