import React from "react";
import { Link } from "react-router-dom";
import DarkModeButton from "../../atoms/Button/DarkModeButton";
import LoginOutButton from "../../atoms/Button/LogInOutButton";
import MenuIconButton from "../../atoms/Button/MenuIconButton";
import SearchButton from "../../atoms/Button/SearchButton";
import styles from "./BottomPane.css";

export default function BottomPane(): JSX.Element {
  return (
    <div className={styles.items}>
      <Link to="/">
        <MenuIconButton icon={["fas", "home"]} />
      </Link>
      <SearchButton />
      <DarkModeButton />
      <LoginOutButton />
    </div>
  );
}
