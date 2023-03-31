import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTextFilter } from "../../reducers/ratingsReviewsSlice";
import MinimumReached from "./MinimumReached";
import ResetFilters from "./ResetFilters";

export default function ReviewListSearchBar() {
  let textFilter = useSelector(
    (state) => state.ratingsReviewsReducer.textFilter
  );
  const { filteredResultsNum, ratingsReviews } = useSelector(
    (s) => s.ratingsReviewsReducer
  );
  let dispatch = useDispatch();

  return (
    <div className="w-full">
      <input
        module="reviewsFilter|Ratings"
        className="w-full rounded-none input input-primary placeholder-secondary"
        type="text"
        placeholder="Filter reviews..."
        value={textFilter}
        onChange={(ev) =>
          dispatch(setTextFilter({ textFilter: ev.target.value }))
        }
      />
      <MinimumReached
        leftElement={<ResetFilters />}
        bg={"base-100"}
        text={textFilter}
        minimum={4}
        leftShown={filteredResultsNum !== ratingsReviews.length}
      />
    </div>
  );
}
