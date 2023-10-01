export function Stats({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> movies
    </p>
  );
}
