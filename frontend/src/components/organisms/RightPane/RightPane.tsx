import React from "react";
import NewsList from "../../molecules/NewsList/NewsList";
import PostSearchBar from "../../molecules/PostSearchBar/PostSearchBar";
import styles from "./RightPane.css";

export default function RightPane(): JSX.Element {
  return (
    <>
      <div className={styles.search_bar}>
        <PostSearchBar />
      </div>
      <div className={styles.news}>
        <NewsList />
      </div>
    </>
  );
}
