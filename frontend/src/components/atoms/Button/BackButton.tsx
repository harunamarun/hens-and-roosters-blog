import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.css";

export default function BackButton(): JSX.Element {
  return (
    <Link className={styles.btn_arrow} to="/">
      <FontAwesomeIcon icon={["fas", "arrow-left"]} color="#2AA1F2" />
    </Link>
  );
}
