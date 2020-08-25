import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "../index.css";
import { searchPropsType } from "../typing/propsType";

export default function SearchBar(props: searchPropsType): JSX.Element {
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const resetModal = () => {
    if (props.modalIsOpen) {
      document.body.removeAttribute("style");
      props.setModalIsOpen(false);
    }
  };

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
            resetModal();
          }
        }}
      />
      <Link
        to={`/?keyword=${keyword}`}
        className={styles.search_icon}
        onClick={resetModal}
      >
        <FontAwesomeIcon icon={["fas", "search"]} color="#657786" />
      </Link>
    </div>
  );
}
