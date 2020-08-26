import React from "react";
import styles from "./Img.css";

type PropsType = {
  src: string;
  alt: string;
};

export default function Img(props: PropsType): JSX.Element {
  const { src, alt } = props;
  return <img src={src} alt={alt} className={styles.img} />;
}
