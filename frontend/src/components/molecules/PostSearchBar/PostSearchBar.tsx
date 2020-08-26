import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, Dispatch, SetStateAction } from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./PostSearchBar.css";

type PropsType = {
  modalIsOpen?: boolean;
  setModalIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function PostSearchBar(props: PropsType): JSX.Element {
  const history = useHistory();
  const [keyword, setKeyword] = useState<string>("");

  const resetModal = () => {
    if (props.modalIsOpen) {
      document.body.removeAttribute("style");
      props.setModalIsOpen(false);
    }
  };

  return (
    <div className={styles.search_container}>
      <input
        className={styles.input}
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
        className={styles.search_button}
        onClick={resetModal}
      >
        <FontAwesomeIcon icon={["fas", "search"]} color="#657786" />
      </Link>
    </div>
  );
}

PostSearchBar.defaultProps = {
  modalIsOpen: false,
  setModalIsOpen: undefined,
};
