import React, { useState } from "react";

export const HorizontalBarWithLabels = ({
  labels,
  percentage,
  handleRatingClick,
  selected,
}) => {
  const width = Math.floor(140 * percentage);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={
        "flex distributionBar flex-1 flex-row items-center mb-4 justify-around cursor-pointer hover:colorShift transition-colors duration-200" +
        (selected ? " bg-base-300" : "") +
        (isHovering ? " bg-base-300" : "")
      }
      module="distributionBar|Ratings"
      onClick={() => handleRatingClick()}
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
    >
      <h5 className="text-sm underline basis-14">{labels[0]}</h5>
      <div className="h-2 basis-40">
        <div className="absolute bar bg-base-200 w-[140px] h-[8px]" />
        <div
          className={
            "filledBar absolute bar bg-secondary h-[8px] box-border border border-solid border-1 border-primary" +
            (selected ? " animating" : "") +
            (isHovering ? " animating" : "")
          }
          style={{ width }} //, backgroundColor: isHovering ? "red" : "" }}
        />
      </div>
      <h5 className="text-sm underline basis-8">{labels[1]}</h5>
    </div>
  );
};
