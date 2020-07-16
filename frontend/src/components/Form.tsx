import React, { useState } from "react";
import { createBlog } from "../services/api";
import styles from "../index.css";
import niwatorisound from "../assets/cock.mp3";
import UserIcon from "./UserIcon";
import { getUserName } from "../utils";
import albumIcon from "../assets/album.png";
import closeIcon from "../assets/close.png";

export default function Form(): JSX.Element {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewImage(reader.result);
      }
    };
    const inputElement: HTMLInputElement = document.getElementById(
      "input-file"
    ) as HTMLInputElement;
    inputElement.value = "";
  };

  const cancelFile = (e) => {
    setImageFile(null);
    setPreviewImage(null);
  };

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
          placeholder="What's happening?"
          onChange={(e) => setContent(e.target.value)}
        />
        {previewImage && (
          <div className={styles.form_img_preview}>
            <img className={styles.form_img} src={previewImage} />
            <img
              src={"/" + closeIcon}
              onClick={cancelFile}
              className={styles.form_img_cancel}
            />
          </div>
        )}
        <label htmlFor="input-file">
          <img src={"/" + albumIcon} width="17px" />
          <input
            className={styles.form_input}
            type="file"
            id="input-file"
            accept="image/png, image/jpeg"
            onChange={handleImageInput}
          />
        </label>
        <button
          className={styles.btn_post}
          onClick={() => {
            createBlog(content, imageFile);
            setContent("");
            setImageFile(null);
            setPreviewImage(null);
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
