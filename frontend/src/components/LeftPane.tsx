import React, { useContext, useState, useEffect } from "react";
import styles from "../index.css";
import icon from "../assets/icon.png";
import iconDark from "../assets/icon_dark.png";
import { Link } from "react-router-dom";
import { getUserName } from "../utils";
import UserIcon from "./UserIcon";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import DarkModeButton from "./DarkModeButton";
import { ThemeContext } from "../store/ThemeContext";
import SearchButton from "./SearchButton";

export default function LeftPane(): JSX.Element {
  const username = getUserName();
  const { user } = useAuth0();
  const { state } = useContext(ThemeContext);
  const [width, setWidth] = useState(window.innerWidth);

  const home = (): JSX.Element => {
    return (
      <Link to={"/"}>
        {state.isDark === "false" ? (
          <img
            src={"/" + icon}
            alt="icon"
            className={styles.main_icon}
            id="main_icon"
          />
        ) : (
          <img
            src={"/" + iconDark}
            alt="icon"
            className={styles.main_icon}
            id="main_icon"
          />
        )}
      </Link>
    );
  };

  const userInfo = (): JSX.Element => {
    return (
      <div className={styles.user_info}>
        <UserIcon username={username} />
        <div>{username}</div>
      </div>
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

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(document.getElementById("root"));
  }, []);

  return (
    <div className={styles.left_pane}>
      <div className={styles.left_pane_items}>
        {home()}
        {userInfo()}
        {logInOut()}
        <DarkModeButton />
        {width <= 990 && <SearchButton />}
      </div>
    </div>
  );
}
