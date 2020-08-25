import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../index.css";
import { centerPropsType } from "../typing/propsType";
import BottomPane from "./BottomPane";
import Form from "./Form";
import MyList from "./MyList";

export default function CenterPane(props: centerPropsType): JSX.Element {
  const { query } = props;
  return (
    <div className={styles.center_pane} id="center">
      {query.keyword ? (
        <>
          <div className={styles.center_pane_head}>
            <Link to="/" className={styles.btn_arrow}>
              <FontAwesomeIcon icon={["fas", "arrow-left"]} color="#2AA1F2" />
            </Link>
            <h1>Search &quot; {query.keyword} &quot;</h1>
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
      <BottomPane />
    </div>
  );
}
