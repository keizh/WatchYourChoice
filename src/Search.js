import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  // document.activeelement is the element that is being focused right now
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [query]
  );

  return (
    <input
      type="text"
      placeholder="choose your poison...."
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
