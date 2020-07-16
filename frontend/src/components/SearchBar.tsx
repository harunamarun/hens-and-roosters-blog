import React, { useState } from "react";
import styles from "../index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar(): JSX.Element {
  const [keyword, setKeyword] = useState("");

  return (
    <div className={styles.search_bar}>
      <input
        className={styles.search_input}
        type="search"
        id="site-search"
        name="q"
        aria-label="Search through site content"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          console.log("key", e.keyCode);
          if (e.keyCode === 13) {
            window.location.href = `/?keyword=${keyword}`;
          }
        }}
      />
      <Link to={`/?keyword=${keyword}`} className={styles.search_icon}>
        <FontAwesomeIcon icon={["fas", "search"]} color={"#657786"} />
      </Link>
    </div>
  );
}
