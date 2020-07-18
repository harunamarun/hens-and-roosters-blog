import React from "react";
import { deleteBlog } from "../services/api";
import styles from "../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";

type propsType = {
  id: number;
  setUpdateStateFlag: (arg1: boolean) => void;
};

export default function ItemBottomBar(props: propsType): JSX.Element {
  const history = useHistory();

  return (
    <div className={styles.bottombar}>
      <button
        className={styles.btn_edit}
        onClick={() => props.setUpdateStateFlag(true)}
      >
        <FontAwesomeIcon icon={["far", "edit"]} color={"#657786"} />
      </button>
      <button
        className={styles.btn_delete}
        onClick={() => deleteBlog(props.id).then(() => history.push(`/`))}
      >
        <FontAwesomeIcon icon={["far", "trash-alt"]} color={"#657786"} />
      </button>
    </div>
  );
}
