import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.css";
import DarkModeButton from "./DarkModeButton";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SearchButton from "./SearchButton";

export default function BottomPane(): JSX.Element {
  const { user } = useAuth0();

  const home = (): JSX.Element => {
    return (
      <Link to="/">
        <FontAwesomeIcon
          icon={["fas", "home"]}
          color="#2AA1F2"
          className={styles.menuicon}
        />
      </Link>
    );
  };

  const logInOut = (): JSX.Element => {
    return (
      <>
        {user ? (
          <>
            <LogoutButton /> <div>{user.nickname}</div>
          </>
        ) : (
          <LoginButton />
        )}
      </>
    );
  };

  return (
    <div className={styles.bottom_pane}>
      <div className={styles.bottom_pane_items}>
        {home()}
        <SearchButton />
        <DarkModeButton />
        {logInOut()}
      </div>
    </div>
  );
}
