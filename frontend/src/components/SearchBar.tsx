import React, { useState } from "react";
import styles from "../index.css";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchBar(): JSX.Element {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  return (
    <div className={styles.search_bar}>
      <input
        className={styles.search_input}
        type="search"
        id="site-search"
        placeholder="Search cock-a-doodle-doos"
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            history.push(`/?keyword=${keyword}`);
          }
        }}
      />
      <Link to={`/?keyword=${keyword}`} className={styles.search_icon}>
        <FontAwesomeIcon icon={["fas", "search"]} color={"#657786"} />
      </Link>
    </div>
  );
}
