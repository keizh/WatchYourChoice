import { useEffect, useState } from "react";

export const key = "9862053a";

export function useMovies(query, handleDisplaySelectedMovieMovedBackBtn) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorExists, setErrorExists] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          // each time data fetching happens the loading state will be set true
          setLoading(true);
          // each time fn is run , it will set error back to non error
          setErrorExists((errorExists) => "");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          // internet connection lost
          if (res.ok === false) throw new Error("Internet connection lost!!!");

          const data = await res.json();

          // when the search thing does not exist
          // console.log(data);

          if (data.Response === "False") throw new Error("No such movie");

          // console.log(data);

          setMovies(data.Search);
          // if any error is thrown the below code wont be executed , that's why it is put in finally clause
          // setLoading(false);
        } catch (error) {
          // console.log(error);
          // console.log(typeof error);

          // condition to avoid abort
          if (error.name !== "AbortError") {
            setErrorExists((errorExists) => error.message);
          }
        } finally {
          setLoading(false);
        }
      }

      //when we search detailed movie should go away
      handleDisplaySelectedMovieMovedBackBtn();

      fetchMovies();

      // each time a new keystore , i.e. new query , our controller will abort the cureent fetch request.
      //  each time a request gets cancelled js sees it as an error.
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, loading, errorExists };
}
