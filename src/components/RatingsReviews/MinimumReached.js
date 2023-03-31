import React from "react";

export default function MinimumReached({
  text,
  bg = "base-200",
  minimum = 50,
  leftElement,
  leftShown = false,
}) {
  return (
    <div
      className={
        "flex bg-inherit flex-row w-full h-8 mt-4 bg-" +
        bg +
        (leftShown ? " justify-between" : " justify-end")
      }
    >
      {leftElement}
      <p className="self-start">
        {text.length < minimum ? (
          <span className="text-sm bold">
            {"Minimum required characters left: [" +
              (minimum - text.length) +
              "]"}
          </span>
        ) : (
          <span className="text-sm bold">Minimum reached.</span>
        )}
      </p>
    </div>
  );
}
