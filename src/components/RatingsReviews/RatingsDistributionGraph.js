import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HorizontalBarWithLabels } from "./HorizontalBarWithLabels";
import {
  addRatingFilter,
  removeRatingFilter,
} from "../../reducers/ratingsReviewsSlice.js";

const RatingsDistributionGraph = ({}) => {
  const meta = useSelector((state) => state.ratingsReviewsReducer.meta);
  const { recommend, ratings } = meta;
  const ratingFilter = useSelector(
    (state) => state.ratingsReviewsReducer.ratingFilter
  );
  const dispatch = useDispatch();

  function handleRatingClick(rating) {
    if (ratingFilter.includes(rating)) {
      dispatch(removeRatingFilter({ rating }));
    } else {
      dispatch(addRatingFilter({ rating }));
    }
  }

  return (
    <div className="graph">
      <h2 className="text-sm">
        {recommend || "Loading"}% of reviews recommend this product
      </h2>
      {ratings &&
        Object.keys(ratings)
          .reverse()
          .map((k) => {
            let selected = false;
            if (ratingFilter.length !== 0 && ratingFilter.includes(k)) {
              selected = true;
            }
            return (
              <HorizontalBarWithLabels
                labels={[
                  k + " star" + (k !== "1" ? "s" : ""),
                  `(${ratings[k]})`,
                ]}
                key={k}
                handleRatingClick={() => handleRatingClick(k)}
                percentage={ratings[k] / meta.max}
                selected={selected}
              />
            );
          })}
    </div>
  );
};

export default RatingsDistributionGraph;
