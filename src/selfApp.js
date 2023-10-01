import { useEffect, useState } from "react";
import { useMovies } from "./useMovies";
import { Search } from "./Search";
import { Stats } from "./Stats";
import { Nav } from "./Nav";
import { ListOfMovies } from "./ListOfMovies";
import { WatchedMovieList } from "./WatchedMovieList";
import { Summary } from "./Summary";
import { ListBox } from "./ListBox";
import { Main } from "./Main";
import { ErrorComponent } from "./ErrorComponent";
import { DisplaySelectedMovie } from "./DisplaySelectedMovie";
// ------------------------->

export default function App() {
  // state for search
  const [query, setQuery] = useState("interstellar");

  const [selectedMovie, setSelectedMovie] = useState(null);

  const { movies, loading, errorExists } = useMovies(
    query,
    handleDisplaySelectedMovieMovedBackBtn
  );

  const [watched, setWatched] = useState(
    Array.from(function () {
      const storedValue = localStorage.getItem("watched");
      return JSON.parse(storedValue) || "";
    })
  );

  const handleSelectedMovie = (id) => {
    setSelectedMovie(id);
  };

  function handleDisplaySelectedMovieMovedBackBtn() {
    setSelectedMovie(null);
  }
  // const handleDisplaySelectedMovieMovedBackBtn = () => {
  //   setSelectedMovie(null);
  // };

  const handleAddMovieInWatchedState = (movie) => {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem('watched' , JSON.stringigy([...watched,movie]));
  };

  const handleRemoveMovieInWatchedStatePlusMoveBack = (id) => {
    const index = watched.map((movie) => movie.imdbID).indexOf(id);
    setWatched((watched) => [
      ...watched.slice(0, index),
      ...watched.slice(index + 1),
    ]);
    setSelectedMovie(null);
  };

  // this is one way of doing it but not the currect way , the eventlistner should only be avoilable when the movie is selected
  // useEffect(function () {
  //   document.addEventListener("keydown", function (e) {
  //     if (e.key === "Escape" && selectedMovie !== null) {
  //       handleDisplaySelectedMovieMovedBackBtn();
  //       console.log("close");
  //     }
  //   });
  // });

  useEffect(
    function () {
      // putting data in local storage
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Nav>
        <Search query={query} setQuery={setQuery} />
        <Stats movies={movies} />
      </Nav>
      <Main>
        <ListBox>
          {errorExists ? (
            <ErrorComponent errorExists={errorExists} />
          ) : loading ? (
            <Spinner />
          ) : (
            <ListOfMovies
              movies={movies}
              onSelectedMovie={handleSelectedMovie}
            />
          )}
          {/* {loading ? <Spinner /> : <ListOfMovies movies={movies} />} */}
          {/* <ListOfMovies movies={movies} /> */}
        </ListBox>

        <ListBox selectedMovie={selectedMovie}>
          {selectedMovie ? (
            <DisplaySelectedMovie
              selectedMovie={selectedMovie}
              onDisplaySelectedMovieMovedBackBtn={
                handleDisplaySelectedMovieMovedBackBtn
              }
              onAddMovieInWatchedState={handleAddMovieInWatchedState}
              setSelectedMovie={setSelectedMovie}
              watched={watched}
              onRemoveMovieInWatchedStatePlusMoveBack={
                handleRemoveMovieInWatchedStatePlusMoveBack
              }
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onRemoveMovieInWatchedStatePlusMoveBack={
                  handleRemoveMovieInWatchedStatePlusMoveBack
                }
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}

export const Spinner = () => {
  return <div className="spinner"></div>;
};
