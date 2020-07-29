import React from "react";
import Form from "./Form";
import MyList from "./MyList";
import styles from "../index.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { centerPropsType } from "../typing/propsType";

export default function CenterPane(props: centerPropsType): JSX.Element {
  const query = props.query;
  return (
    <div className={styles.center_pane} id="center">
      {props.query.keyword ? (
        <>
          <div className={styles.center_pane_head}>
            <Link to={"/"} className={styles.btn_arrow}>
              <FontAwesomeIcon icon={["fas", "arrow-left"]} color={"#2AA1F2"} />
            </Link>
            <h1>Search &quot; {props.query.keyword} &quot;</h1>
          </div>

          <MyList key={`${query.keyword}`} query={query} />
        </>
      ) : (
        <>
          <div className={styles.center_pane_head}>
            <h1>Latest cock-a-doodle-doos</h1>
          </div>
          <Form />
          <MyList query={query} />
        </>
      )}
    </div>
  );
}
