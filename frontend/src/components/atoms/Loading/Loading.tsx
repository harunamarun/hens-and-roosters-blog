import { PacmanLoader } from "halogenium";
import React from "react";
import styles from "./Loading.css";

export default function Loading(): JSX.Element {
  return (
    <div className={styles.loading}>
      <PacmanLoader color="#2AA1F2" size="16px" />
    </div>
  );
}
