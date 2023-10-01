import { Movie } from "./Movie";

export function ListOfMovies({ movies, onSelectedMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  );
}
