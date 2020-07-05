import React from "react";
import { deleteBlog } from "../services/api";
import trashIcon from "../assets/trash.png";
import editIcon from "../assets/edit.png";
import styles from "../index.css";

type propsType = {
  id: number;
  setUpdateStateFlag: (arg1: boolean) => void;
};

export default function ItemBottomBar(props: propsType): JSX.Element {
  return (
    <div className={styles.bottombar}>
      <button
        className={styles.btn_edit}
        onClick={() => props.setUpdateStateFlag(true)}
      >
        <img src={"/" + editIcon} width="17px" />
      </button>
      <button
        className={styles.btn_delete}
        onClick={() =>
          deleteBlog(props.id).then(() => {
            window.location.href = "/";
          })
        }
      >
        <img src={"/" + trashIcon} width="17px" />
      </button>
    </div>
  );
}
