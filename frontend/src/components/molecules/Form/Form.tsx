import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import closeIcon from "../../../assets/close.png";
import niwatorisound from "../../../assets/cock.mp3";
import gificon from "../../../assets/gif.png";
import gificonDis from "../../../assets/gifdis.png";
import { ThemeContext } from "../../../store/ThemeContext";
import { createBlog } from "../../../utils/api";
import getUserName from "../../../utils/utils";
import DefaultButton from "../../atoms/Button/DefaultButton";
import Img from "../../atoms/Img/Img";
import Textarea from "../../atoms/Input/Textarea";
import Giphy from "../Giphy/Giphy";
import IconDocContainer from "../IconDocContainer/IconDocContainer";
import styles from "./Form.css";

Modal.setAppElement("#root");

export default function Form(): JSX.Element {
  const { state } = useContext(ThemeContext);
  const [content, setContent] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>(null);
  const [previewImage, setPreviewImage] = useState<string>(null);
  const [gifURL, setGifURL] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (): void => {
      if (typeof reader.result === "string") {
        setPreviewImage(reader.result);
      }
    };
  };

  const cancelFile = (): void => {
    setImageFile(null);
    setPreviewImage(null);
    setGifURL("");
  };

  const postBlog = (): void => {
    createBlog(content, imageFile, gifURL).catch((err) => err.message);
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
    // TODO: need to fix how to reload
    // eslint-disable-next-line no-restricted-globals
    setTimeout(() => location.reload(), 2500);
  };

  const albumButton = (): JSX.Element => {
    return (
      <>
        {previewImage ? (
          <FontAwesomeIcon
            icon={["far", "image"]}
            color="#86D0F9"
            style={{ fontSize: "20px", padding: "5px" }}
          />
        ) : (
          <label htmlFor="input-file" className={styles.btn_album}>
            <FontAwesomeIcon icon={["far", "image"]} color="#2AA1F2" />
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

  const gifButton = (): JSX.Element => {
    return (
      <>
        {previewImage ? (
          <img src={gificonDis} width="20px" alt="disable gif icon" />
        ) : (
          <button
            className={styles.btn_gif}
            type="button"
            onClick={() => {
              setModalIsOpen(true);
              document.body.setAttribute("style", "overflow: hidden;");
            }}
          >
            <img src={gificon} alt="gif icon" width="20px" />
          </button>
        )}
      </>
    );
  };

  const postButton = (): JSX.Element => {
    return (
      <div className={styles.post_container}>
        {content || previewImage ? (
          <DefaultButton onClick={postBlog}>cock-a-doodle-doo</DefaultButton>
        ) : (
          <DefaultButton disabled onClick={postBlog}>
            cock-a-doodle-doo
          </DefaultButton>
        )}
      </div>
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
      <IconDocContainer username={getUserName()}>
        <>
          <Textarea
            name="comment"
            id="comment"
            value={content}
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
          />
          {previewImage && (
            <div className={styles.img_container}>
              <Img alt="previewImage" src={previewImage} />
              <button
                type="button"
                onClick={cancelFile}
                className={styles.img_cancel}
              >
                <img alt="previewImage close icon" src={`/${closeIcon}`} />
              </button>
            </div>
          )}
          <div className={styles.bottom_container}>
            {albumButton()}
            {gifButton()}
            {postButton()}
            {/* This audio is just an effect. we do not need a caption. */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
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
        </>
      </IconDocContainer>
    </div>
  );
}
