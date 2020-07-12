import React from "react";
import usericon0 from "../assets/usericon0.jpg";
import usericon1 from "../assets/usericon1.jpg";
import usericon2 from "../assets/usericon2.png";
import usericon3 from "../assets/usericon3.jpg";
import usericon4 from "../assets/usericon4.jpg";
import usericon5 from "../assets/usericon5.jpg";
import styles from "../index.css";

export default function UserIcon(props): JSX.Element {
  const num = hashName(props.username) % 6;
  const iconArray = [
    usericon0,
    usericon1,
    usericon2,
    usericon3,
    usericon4,
    usericon5,
  ];
  return (
    <img
      className={styles.profile_img}
      src={"/" + iconArray[num]}
      alt="icon"
      width="50px"
    />
  );
}

const hashName = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum;
};
