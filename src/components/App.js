import React from "react";
import Overview from "./Overview.js";
import QuestionsAnswers from "./QuestionsAnswers.js";
import Related from "./Related.js";
import RatingsReviews from "./RatingsReviews";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClick } from "../reducers/clickSlice";
import {
  closeTopMostModal,
  setThemeShown,
  setTheme,
} from "../reducers/modalSlice";
import PhotoModal from "./sharedComponents/PhotoModal";
import SupportModal from "./RatingsReviews/SupportModal";
import ThemeModal from "./sharedComponents/ThemeModal";
import LoadingScreen from "./LoadingScreen";

const App = () => {
  const dispatch = useDispatch();
  const themeToIcon = {
    darkTheme: "🌙",
    lightTheme: "🔆",
    cherryTheme: "🌸",
    orangeTheme: "🎃",
    darkCherryTheme: "🎴",
  };
  const theme = useSelector((state) => state.modalReducer.theme.theme);

  const trackClick = (payload) => {
    dispatch(addClick(payload));
  };

  const clickObject = useSelector((state) => state.clickReducer.clicks);
  // Add this to any element you would like to be tracked
  // Format  - module="<eventName>|<yourModule>" (ex. <div module="styleBtn|Overview">)
  // console.log(clickObject)

  // uncomment to test clicks -> logs click count object

  useEffect(() => {
    function handleTracking(event) {
      let ElementModule = null;
      let element = "";
      let module = "";
      let time = Date.now();
      if (event.target.attributes.module) {
        ElementModule = event.target.attributes.module.value;
      }
      let parent = event.target.parentNode;
      while (parent) {
        const attributes = parent.attributes;
        if (attributes && attributes.module && ElementModule === null) {
          ElementModule = attributes.module.value;
          break;
        }
        parent = parent.parentNode;
      }
      if (ElementModule) {
        let EM = ElementModule.split("|");
        element = EM[0];
        module = EM[1];
      }
      trackClick({ element, time, module });
    }
    window.addEventListener("click", handleTracking);
    return () => {
      window.removeEventListener("click", handleTracking);
    };

    // document.querySelector('body').style.backgroundColor = 'red'
    // document.body.style.background = "red"
  }, []);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "darkCherryTheme";
    setTheTheme(localTheme);
  }, []);

  useEffect(() => {
    window.addEventListener(
      "keyup",
      (ev) => ev.key === "Escape" && dispatch(closeTopMostModal())
    );
  }, []);

  let setTheTheme = (theme) => {
    localStorage.setItem("theme", theme);
    dispatch(setTheme({ theme }));
  };

  let openThemeModal = () => {
    dispatch(setThemeShown(true));
  };

  return (
    <div id="root" className="bg-base-100 text-primary" data-theme={theme}>
      <div className="relative app text-primary">
        <div className="container absolute top-0 right-0 flex flex-row justify-end">
          <button
            id="btn3"
            className="right-0 btn btn-active btn-ghost"
            onClick={openThemeModal}
          >
            {themeToIcon[theme]}
          </button>
          <ThemeModal />
        </div>
        <Overview />
        <Related />
        <QuestionsAnswers />
        <RatingsReviews />
        <PhotoModal />
        <SupportModal />
      </div>
    </div>
  );
};

export default App;
