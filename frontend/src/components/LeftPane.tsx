import React, { useContext } from "react";
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

export default function LeftPane(): JSX.Element {
  const username = getUserName();
  const { user, isAuthenticated } = useAuth0();
  const { state } = useContext(ThemeContext);
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <div className={styles.left_pane}>
      <div className={styles.left_pane_items}>
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
        <div className={styles.user_info}>
          <UserIcon username={username} />
          <div>{username}</div>
        </div>
        {user ? (
          <>
            <LogoutButton /> <div>{user.nickname}</div>
          </>
        ) : (
          <LoginButton />
        )}
        <DarkModeButton />
      </div>
    </div>
  );
}
