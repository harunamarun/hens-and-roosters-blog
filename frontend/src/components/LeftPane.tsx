import React from "react";
import styles from "../index.css";
import icon from "../assets/icon.png";
import { Link } from "react-router-dom";
import { getUserName } from "../utils";
import UserIcon from "./UserIcon";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function LeftPane(): JSX.Element {
  const username = getUserName();
  const { user, isAuthenticated } = useAuth0();
  console.log("user", user);
  console.log("isAuthenticated", isAuthenticated);
  return (
    <div className={styles.left_pane}>
      <div className={styles.left_pane_items}>
        <Link to={"/"}>
          <img src={"/" + icon} alt="icon" width="50px" />
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
      </div>
    </div>
  );
}
