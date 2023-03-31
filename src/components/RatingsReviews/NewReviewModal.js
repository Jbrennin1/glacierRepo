import React from "react";
import NewReviewForm from "./NewReviewForm.js";
import { useSelector, useDispatch } from "react-redux";
import { toggleReviewModal } from "../../reducers/modalSlice.js";
import { AiOutlineCloseSquare } from "react-icons/ai";

export default function NewReviewModal({ checked, name, hidden }) {
  const dispatch = useDispatch();
  const { showMore } = useSelector((state) => state.ratingsReviewsReducer);
  const { isShown } = useSelector((state) => state.modalReducer.newReview);

  return (
    <div
      className={
        "flex justify-center items-center newReviewModal close" +
        (!isShown ? " hidden" : "")
      }
      onClick={(ev) => {
        if (Array.from(ev.target.classList).includes("close")) {
          dispatch(toggleReviewModal());
        }
      }}
      module="newReviewModal|Ratings"
      key={100000000}
    >
      <section
        role="dialog"
        className={
          "modalBox bg-base-100 max-w-[800px] min-w-[600px] min-h-2/3" +
          (!isShown ? "" : " active")
        }
      >
        <span className="fixed closePhotoModal close ">
          <AiOutlineCloseSquare className="fixed w-[25px] h-[25px] hover:cursor-pointer closePhotoButton top-2 right-2 bg-base-100 close" />
        </span>
        <h3 className="text-2xl font-bold text-center">Write Your Review</h3>
        <h4 className="text-xl font-bold text-center">About the {name}</h4>
        <NewReviewForm />
      </section>
    </div>
  );
}
