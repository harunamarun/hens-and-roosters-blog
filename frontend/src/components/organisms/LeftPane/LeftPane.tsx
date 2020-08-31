import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import getUserName from "../../../utils/utils";
import DarkModeButton from "../../atoms/Button/DarkModeButton";
import LoginOutButton from "../../atoms/Button/LogInOutButton";
import SearchButton from "../../atoms/Button/SearchButton";
import HomeIcon from "../../atoms/Icons/HomeIcon";
import UserIcon from "../../atoms/Icons/UserIcon";
import styles from "./LeftPane.css";

export default function LeftPane(): JSX.Element {
  const username = getUserName();
  const { user } = useAuth0();
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(document.getElementById("root"));
  }, []);

  return (
    <div className={styles.items}>
      <HomeIcon />
      <UserIcon username={username} />
      <LoginOutButton />
      <div className={styles.nickname}>{user && user.nickname}</div>
      <DarkModeButton />
      {width <= 990 && <SearchButton />}
    </div>
  );
}
