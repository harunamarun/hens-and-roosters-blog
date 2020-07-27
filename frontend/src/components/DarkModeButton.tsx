import React, { useContext, useLayoutEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../index.css";
import { ThemeContext } from "../store/ThemeContext";

export default function DarkModeButton(): JSX.Element {
  const elementStyle = document.documentElement.style;
  const { state, dispatch } = useContext(ThemeContext);

  useLayoutEffect(() => {
    if (state.isDark === "true") {
      elementStyle.setProperty("--main-background-color", "#16202B");
      elementStyle.setProperty("--disabled-blue-color", "#1A608E");
      elementStyle.setProperty("--main-border-color", "#253341");
      elementStyle.setProperty("--main-subbackground-color", "#192734");
      elementStyle.setProperty("--main-text-color", "#E1E1E1");
    } else {
      elementStyle.setProperty("--main-background-color", "#FFFFFF");
      elementStyle.setProperty("--disabled-blue-color", "#86D0F9");
      elementStyle.setProperty("--main-border-color", "#E6ECF0");
      elementStyle.setProperty("--main-subbackground-color", "#F5F8FA");
      elementStyle.setProperty("--main-text-color", "#14171A");
    }
  }, [state.isDark]);

  return (
    <>
      {state.isDark === "true" ? (
        <FontAwesomeIcon
          onClick={() => dispatch({ type: "LIGHT_MODE" })}
          icon={["fas", "sun"]}
          color={"#2AA1F2"}
          className={styles.darkmode}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => dispatch({ type: "DARK_MODE" })}
          icon={["fas", "moon"]}
          color={"#2AA1F2"}
          className={styles.darkmode}
        />
      )}
    </>
  );
}
