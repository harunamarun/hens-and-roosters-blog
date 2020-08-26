import React from "react";
import UserIcon from "../../atoms/Icons/UserIcon";
import styles from "./IconDocContainer.css";

type PropsType = {
  children: JSX.Element;
  username: string;
  time?: string;
};
export default function IconDocContainer(props: PropsType): JSX.Element {
  const { children, username, time } = props;
  return (
    <>
      <div className={styles.left_side}>
        <UserIcon username={username} />
      </div>
      <div className={styles.right_side}>
        <p className={styles.username}>{username}</p>
        {time && <p className={styles.time}>• {time}</p>}
        {children}
      </div>
    </>
  );
}

IconDocContainer.defaultProps = {
  time: undefined,
};
