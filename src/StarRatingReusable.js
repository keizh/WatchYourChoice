import { useState } from "react";

function Star({
  Size,
  Color,
  onClickToRate,
  onHoverToTempRateIN,
  onHoverToTempRateOUT,
  FULL,
}) {
  const spanStyle = {
    width: `${Size}px`,
    height: `${Size}px`,
    aspectRatio: 1,
    display: "inline-block",
    cursor: "pointer",
    color: { Color },
  };
  return (
    <span
      role="button"
      style={spanStyle}
      onClick={onClickToRate}
      onMouseEnter={onHoverToTempRateIN}
      onMouseLeave={onHoverToTempRateOUT}
    >
      {FULL ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={Color}
          stroke={Color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={Color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

export default function StarRatingReusable({
  maxStars,
  Size,
  Color,
  defaultstars,
  stars,
  setStars,
}) {
  const [rating, setRating] = useState(defaultstars);
  const [tempRating, setTempRating] = useState(0);

  const starRatingWrapper = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const starWrapper = {
    display: "flex",
    gap: "4px",
  };

  const textStyle = {
    margin: 0,
    fontSize: `${Size / 1.5}px`,
    color: { Color },
  };

  const handleonClickToRate = (star_index) => {
    setRating((rating) => star_index);
    setStars((stars) => star_index);
  };

  const handleonMouseEnter = (temp_index) => {
    setTempRating((tempRating) => temp_index);
  };

  const handleonMouseLeave = () => {
    setTempRating((tempRating) => 0);
  };

  return (
    <div style={starRatingWrapper}>
      <div style={starWrapper}>
        {Array.from({ length: maxStars }, (_, index) => (
          <Star
            key={index + 1}
            Size={Size}
            Color={Color}
            onClickToRate={(e) => handleonClickToRate(index + 1)}
            onHoverToTempRateIN={(e) => handleonMouseEnter(index + 1)}
            onHoverToTempRateOUT={(e) => handleonMouseLeave(0)}
            FULL={tempRating ? tempRating >= index + 1 : rating >= index + 1}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || "--"}</p>
    </div>
  );
}
