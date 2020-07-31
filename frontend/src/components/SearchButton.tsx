import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../index.css";
import Modal from "react-modal";
import SearchBar from "./SearchBar";
import { ThemeContext } from "../store/ThemeContext";

Modal.setAppElement("#root");

export default function SearchButton(): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { state } = useContext(ThemeContext);

  const search = () => {
    console.log("click");
    setModalIsOpen(true);
    document.body.setAttribute("style", "overflow: hidden;");
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
        bottom: "none",
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
    <>
      <FontAwesomeIcon
        onClick={search}
        icon={["fas", "search"]}
        color={"#2AA1F2"}
        className={styles.menuicon}
      />
      <Modal
        style={customStyles()}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          document.body.removeAttribute("style");
          setModalIsOpen(false);
        }}
      >
        <SearchBar modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
}
