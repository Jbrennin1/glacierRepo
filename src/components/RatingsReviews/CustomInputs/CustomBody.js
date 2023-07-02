import React, { useState } from "react";
import { useField } from "formik";
import MinimumReached from "../MinimumReached";
import { useDispatch } from "react-redux";
import {
  toggleReviewModal,
  setSupportShown,
} from "../../../reducers/modalSlice";

export default function CustomBody({ label, noCrap = false, ...props }) {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error;
  const [hidden, setHidden] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (ev) => {
    await helpers.setValue(ev.target.value);
    await helpers.setTouched(true);
  };

  const handleSupportClick = (ev) => {
    dispatch(setSupportShown(true));
  };

  return (
    <div className="flex flex-col" style={{ marginBottom: "5px" }}>
      {error && meta.touched && <div className="text-error">{error}</div>}
      <label htmlFor={props.name} className="mb-4">
        {label}
      </label>
      <div className="relative">
        <textarea
          className="rounded-none w-[450px] z-10 relative textarea textarea-primary bg-base-100"
          onChange={handleChange}
          value={field.value}
          name={props.name}
          onBlur={field.onBlur}
          module="newReviewBody|Ratings"
          onFocus={(ev) => {
            setHidden(true);
          }}
          onBlur={(ev) => {
            if (ev.target.value === "") setHidden(false);
          }}
        />
        {!noCrap ? (
          <div
            className={
              "absolute flex flex-row top-2 left-2" + (hidden ? " hidden" : "")
            }
          >
            <span className="z-20 text-sm pointer-events-none text-secondary">
              What made this purchase absolutely delightful or{" "}
            </span>
            <button
              className="ml-1 btn btn-secondary btn-xs btn-square text-xs w-[50px] z-20"
              onClick={handleSupportClick}
              type="button"
              module="newReviewSupportButton|Ratings"
            >
              {"not :(?"}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <MinimumReached text={field.value} />
    </div>
  );
}
