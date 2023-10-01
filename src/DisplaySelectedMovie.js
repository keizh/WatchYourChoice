import { useEffect, useState } from "react";
import StarRatingReusable from "./StarRatingReusable";
import { key, Spinner } from "./selfApp";

const keyapi = "9862053a";

export function DisplaySelectedMovie({
  selectedMovie,
  setSelectedMovie,
  onDisplaySelectedMovieMovedBackBtn,
  onAddMovieInWatchedState,
  watched,
  onRemoveMovieInWatchedStatePlusMoveBack,
  onUpdateMovieInWatchedStatePlusMoveBack,
}) {
  const [MovieById, setMovieById] = useState({});
  // state to handle rating done inside of star
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const alreadyInWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);

  let movieinwatchedstatestarsgiven = 0;

  if (alreadyInWatched) {
    movieinwatchedstatestarsgiven = watched.filter(
      (movie) => movie.imdbID === selectedMovie
    )[0].userRating;
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = MovieById;

  const handleAddMovieInWatchedStatePlusMoveBack = () => {
    const MovieToAddInWatchedList = {
      imdbID: selectedMovie,
      Title: title,
      year,
      Poster: poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating: stars,
    };

    onDisplaySelectedMovieMovedBackBtn();

    onAddMovieInWatchedState(MovieToAddInWatchedList);
  };

  // multiple times the useeffect gets executed
  // each time a new movie detail component mounts ,  a new event listener is added to the document.
  // each time the event lisner is executed it will add 1 more event listner to the document,
  // id we open up 10 movies , and close them all , we will end up with 10 of the same event listeners  on the document
  //  we also need to clean up our event listners.

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onDisplaySelectedMovieMovedBackBtn();
          console.log("close");
        }
      }

      document.addEventListener("keydown", callback);
      // callback function not function call
      return function () {
        // first argument should be keydown
        // second argument should  entire function
        document.removeEventListener("keydown", callback);
      };
    },
    // inclusing function in dependency array
    [onDisplaySelectedMovieMovedBackBtn]
  );

  useEffect(
    function () {
      const fetchSelectedMovieByID = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${keyapi}&i=${selectedMovie}`
          );

          const data = await response.json();
          // console.log(data);
          document.title = `Movie | ${data.Title}`;
          setMovieById(data);
          setIsLoading(false);
        } catch (error) {
        } finally {
        }
      };
      fetchSelectedMovieByID();
    },
    [selectedMovie]
  );

  // for changing the title when ever a new movie is selected.
  useEffect(
    function () {
      // if title is not described return
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `usePopcorn`;
      };
    },
    // any time the dependency changes render the useeffect
    [title]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="MoveBack-DisplaySelectedMovie"
            onClick={onDisplaySelectedMovieMovedBackBtn}
          >
            &#8592;
          </button>
          <div>
            <header className="MovieShortDetail">
              <img src={poster} alt={`${title}Poster`} />
              <div>
                <h2>{title}</h2>
                <p>
                  <span>{released}</span>
                  <span>&#x2022;</span>
                  <span>{runtime}</span>
                </p>
                <p>{genre}</p>
                <p>⭐{imdbRating} IMDb rating</p>
              </div>
            </header>
            <div className="SelectRating-Add-RemoveBTN">
              {alreadyInWatched ? (
                <div className="when-movie-needs-to-be-removed">
                  <p style={{ display: "inlineBlock" }}>
                    You rated this movie {movieinwatchedstatestarsgiven}
                  </p>
                  <button
                    onClick={() =>
                      onRemoveMovieInWatchedStatePlusMoveBack(selectedMovie)
                    }
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="when-movie-needs-to-be-added">
                  <StarRatingReusable
                    maxStars={10}
                    Size={25}
                    Color="yellow"
                    stars={stars}
                    default={0}
                    setStars={setStars}
                  />
                  {stars > 0 && (
                    <button onClick={handleAddMovieInWatchedStatePlusMoveBack}>
                      Add
                    </button>
                  )}
                </div>
              )}
            </div>
            <footer className="MovieLongDetail">
              <p>
                <em>Story-Line:</em> {plot}
              </p>
              <p>
                <em>Cast:</em> {actors}
              </p>
              <p>
                <em>Director:</em> {director}
              </p>
            </footer>
          </div>
        </>
      )}
    </>
  );
}
