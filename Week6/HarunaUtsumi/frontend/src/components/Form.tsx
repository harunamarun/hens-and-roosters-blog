import React, { useState } from "react";
import { createBlog } from "../services/api";
import styles from "../index.css";
import niwatorisound from "../assets/cock.mp3";
import UserIcon from "./UserIcon";
import { getUserName } from "../utils";

export default function Form(): JSX.Element {
  const [content, setContent] = useState("");

  return (
    <div className={styles.form_area}>
      <div className={styles.left_side}>
        <UserIcon username={getUserName()} />
      </div>
      <div className={styles.right_side}>
        <label htmlFor="comment"></label>
        <textarea
          className={styles.text_area}
          name="comment"
          id="comment"
          value={content}
          placeholder="What's happning?"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={styles.btn_post}
          onClick={() => {
            createBlog(content);
            setContent("");
            const audioElement = document.getElementById("cock-audio");
            if (!(audioElement instanceof HTMLMediaElement)) {
              return;
            }
            audioElement.play();
            setTimeout(() => location.reload(), 2500);
          }}
        >
          cock-a-doodle-doo
        </button>
        <audio src={niwatorisound} id="cock-audio" />
      </div>
    </div>
  );
}
