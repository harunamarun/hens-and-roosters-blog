import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router-dom";
import { deleteBlog } from "../../../utils/api";
import styles from "./DetailBottomBar.css";

type propsType = {
  id: string;
  setUpdateStateFlag: (arg1: boolean) => void;
};

export default function DetailBottomBar(props: propsType): JSX.Element {
  const history = useHistory();

  return (
    <div className={styles.bottombar}>
      <button
        type="button"
        className={styles.btn_edit}
        onClick={() => props.setUpdateStateFlag(true)}
      >
        <FontAwesomeIcon icon={["far", "edit"]} color="#657786" />
      </button>
      <button
        type="button"
        className={styles.btn_delete}
        onClick={() => deleteBlog(props.id).then(() => history.push(`/`))}
      >
        <FontAwesomeIcon icon={["far", "trash-alt"]} color="#657786" />
      </button>
    </div>
  );
}
