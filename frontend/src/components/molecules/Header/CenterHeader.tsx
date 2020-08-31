import React from "react";
import BackButton from "../../atoms/Button/BackButton";
import styles from "./Header.css";

export type PropsType = {
  backButton: boolean;
  children: string;
};

export default function CenterHeader(props: PropsType): JSX.Element {
  const { backButton, children } = props;
  return (
    <div className={styles.center_header}>
      {backButton && <BackButton />}
      <h1>{children}</h1>
    </div>
  );
}
