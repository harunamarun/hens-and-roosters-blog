import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../index.css";
import { ThemeContext } from "../store/ThemeContext";

export default function DarkModeButton(): JSX.Element {
  const { state, dispatch } = useContext(ThemeContext);

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
