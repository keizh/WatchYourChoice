export function ErrorComponent({ errorExists }) {
  return (
    <div
      style={{
        textAlign: "center",
        textTransform: "uppercase",
        marginTop: "20rem",
        fontSize: "2rem",
      }}
    >
      {errorExists}
    </div>
  );
}
