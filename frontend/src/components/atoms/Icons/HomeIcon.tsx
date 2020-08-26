import React, { useContext } from "react";
import { Link } from "react-router-dom";
import icon from "../../../assets/icon.png";
import iconDark from "../../../assets/icon_dark.png";
import { ThemeContext } from "../../../store/ThemeContext";
import styles from "./icons.css";

export default function HomeIcon(): JSX.Element {
  const { state } = useContext(ThemeContext);

  return (
    <Link to="/">
      {state.isDark === "false" ? (
        <img
          src={`/${icon}`}
          alt="icon"
          className={styles.home_icon}
          id="main_icon"
        />
      ) : (
        <img
          src={`/${iconDark}`}
          alt="icon"
          className={styles.home_icon}
          id="main_icon"
        />
      )}
    </Link>
  );
}
