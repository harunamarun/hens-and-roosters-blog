import React, { useState, useContext } from "react";
import { createBlog } from "../services/api";
import styles from "../index.css";
import niwatorisound from "../assets/cock.mp3";
import UserIcon from "./UserIcon";
import { getUserName } from "../utils";
import closeIcon from "../assets/close.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Giphy from "./Giphy";
import gificon from "../assets/gif.png";
import gificonDis from "../assets/gifdis.png";
import Modal from "react-modal";
import { ThemeContext } from "../store/ThemeContext";

Modal.setAppElement("#root");

export default function Form(): JSX.Element {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [gifURL, setGifURL] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { state } = useContext(ThemeContext);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const cancelFile = () => {
    setImageFile(null);
    setPreviewImage(null);
    setGifURL("");
  };

  const postBlog = () => {
    createBlog(content, imageFile, gifURL);
    setContent("");
    setImageFile(null);
    setPreviewImage(null);
    setGifURL("");
    const audioElement = document.getElementById("cock-audio");
    if (!(audioElement instanceof HTMLMediaElement)) {
      return;
    }
    const icon = document.getElementById("main_icon");
    icon.classList.add(styles.onclick);
    audioElement.play();
    setTimeout(() => location.reload(), 2500);
  };

  const albumButton = () => {
    return (
      <>
        {previewImage ? (
          <FontAwesomeIcon
            icon={["far", "image"]}
            color={"#86D0F9"}
            style={{ fontSize: "20px", padding: "5px" }}
          />
        ) : (
          <label htmlFor="input-file" className={styles.btn_album}>
            <FontAwesomeIcon icon={["far", "image"]} color={"#2AA1F2"} />
            <input
              className={styles.form_input}
              type="file"
              id="input-file"
              accept="image/png, image/jpeg"
              onChange={handleImageInput}
            />
          </label>
        )}
      </>
    );
  };

  const gifButton = () => {
    return (
      <>
        {previewImage ? (
          <img src={gificonDis} width="20px" />
        ) : (
          <div className={styles.btn_gif}>
            <img
              src={gificon}
              onClick={() => {
                setModalIsOpen(true);
                document.body.setAttribute("style", "overflow: hidden;");
              }}
              width="20px"
            />
          </div>
        )}
      </>
    );
  };

  const postButton = () => {
    return (
      <>
        {content || previewImage ? (
          <button className={styles.btn_post} onClick={postBlog}>
            cock-a-doodle-doo
          </button>
        ) : (
          <button disabled className={styles.btn_post} onClick={postBlog}>
            cock-a-doodle-doo
          </button>
        )}
      </>
    );
  };

  const customStyles = () => {
    const style = {
      overlay: {
        zIndex: "100",
        backgroundColor: "rgba(256,256,256,0.75)",
      },
      content: {
        position: "absolute",
        top: "60px",
        left: "50%",
        right: "auto",
        bottom: "60px",
        marginRight: "50%",
        transform: "translate(-50%)",
        backgroundColor: "rgba(256,256,256)",
      },
    };
    if (state.isDark === "true") {
      style.overlay.backgroundColor = "rgba(0, 0, 0, 0.75)";
      style.content.backgroundColor = "#192734";
    }
    return style;
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
        <div className={styles.form_bottom}>
          {albumButton()}
          {gifButton()}
          {postButton()}
          <audio src={niwatorisound} id="cock-audio" />
        </div>
        <Modal
          style={customStyles()}
          isOpen={modalIsOpen}
          onRequestClose={() => {
            document.body.removeAttribute("style");
            setModalIsOpen(false);
          }}
        >
          <Giphy
            setGifURL={setGifURL}
            setModalIsOpen={setModalIsOpen}
            setPreviewImage={setPreviewImage}
          />
        </Modal>
      </div>
    </div>
  );
}
