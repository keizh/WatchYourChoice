export function Summary({ watched }) {
  console.log(watched);

  const avgImdbRating =
    watched.reduce(
      (acc, watchedmovie) =>
        acc + watchedmovie.imdbRating === "NaN" ? 0 : watchedmovie.imdbRating,
      0
    ) / watched.length;

  const avgRuntime =
    watched.reduce(
      (acc, watchedmovie) =>
        acc + watchedmovie.runtime === "NaN" ? 0 : watchedmovie.runtime,
      0
    ) / watched.length;

  const avgUserRating =
    watched.reduce((acc, watchedmovie) => acc + watchedmovie.userRating, 0) /
    watched.length;

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating ? avgImdbRating.toFixed(2) : 0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating ? avgUserRating.toFixed(2) : 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime ? avgRuntime : 0} min</span>
        </p>
      </div>
    </div>
  );
}
