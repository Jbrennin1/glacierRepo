import React, { useState } from "react";
import ReviewHeader from "./ReviewHeader.js";
import HelpfulStatus from "../sharedComponents/HelpfulStatus";
import QaStatus from "../sharedComponents/QaStatus";
import { useDispatch, useSelector } from "react-redux";
import RecommendedWidget from "./RecommendedWidget";
import ResponseFromSeller from "./ResponseFromSeller";
import Photos from "../sharedComponents/Photos";

const forEachReplaceAll = (text, textFilterLen, regexp) => {
  let textArr = text.split("");
  let i = 0;
  while (i < textArr.length - textFilterLen + 1) {
    const textSlice = textArr.slice(i, i + textFilterLen).join("");
    if (regexp.test(textSlice)) {
      textArr.splice(
        i,
        textFilterLen,
        `<mark className="text-yellow-300">${textSlice}</mark>`
      );
      textArr = textArr.join("").split("");
      const tempStr = textArr.join("");
      const indexOfMark = tempStr.indexOf("</mark>", i);
      i = indexOfMark + 5;
    }
    i++;
  }
  return textArr.join("");
};

const ReviewListItem = ({
  review,
  handleHelpfulClick,
  handleReportClick,
  loading,
}) => {
  const dispatch = useDispatch();
  const [capBody, setCap] = useState(true);
  const textFilter = useSelector(
    (state) => state.ratingsReviewsReducer.textFilter
  );

  let textFilterRegex = new RegExp(
    textFilter
      .split("")
      .map((val) => {
        return "[" + val.toUpperCase() + val.toLowerCase() + "]";
      })
      .join("")
  ); //[Tt][Hh]

  let summary = review.summary; //.replaceAll;
  let body = review.body;

  if (textFilter.length > 3) {
    summary = forEachReplaceAll(summary, textFilter.length, textFilterRegex);
    body = forEachReplaceAll(body, textFilter.length, textFilterRegex);
  }

  const firstMarkInBody = body.indexOf("<mark");
  let capLen =
    firstMarkInBody < 260 && firstMarkInBody >= 240 ? firstMarkInBody : 250;
  return (
    <div className="review">
      <ReviewHeader review={review} />
      <h3 className="bold" dangerouslySetInnerHTML={{ __html: summary }}>
        {/*.slice(0, 60)*/}
      </h3>
      <p
        dangerouslySetInnerHTML={{
          __html: body.slice(0, capBody ? capLen : undefined),
        }}
      >
        {}
      </p>
      {body && body.length > capLen && (
        <div className="w-full showMore">
          <a
            className="underline cursor-pointer"
            onClick={() => setCap(!capBody)}
            module="showMoreReview|Ratings"
          >
            {capBody ? "Show More" : "Show Less"}
          </a>
        </div>
      )}
      {review && review.recommend && <RecommendedWidget />}
      {review && review.response && (
        <ResponseFromSeller response={review.response} />
      )}
      <div className="flex flex-row justify-between helpfulAndImage">
        <HelpfulStatus
          handleHelpfulClick={handleHelpfulClick.bind(null, review.review_id)}
          handleReportClick={handleReportClick.bind(null, review.review_id)}
          messageType={"review"}
          data={{ helpfulCount: review.helpfulness }}
          loading={loading}
          module={"Ratings"}
        />
        {review.photos.length > 0 && (
          <Photos
            width={50}
            height={50}
            custom={true}
            photos={review.photos.map((p) => p.url)}
            module="Ratings"
          />
        )}
      </div>
    </div>
  );
};

export { forEachReplaceAll };
export default ReviewListItem;
