import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { ThemeContext } from "../../../store/ThemeContext";
import PostSearchBar from "../../molecules/PostSearchBar/PostSearchBar";
import MenuIconButton from "./MenuIconButton";

Modal.setAppElement("#root");

export default function SearchButton(): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const { state } = useContext(ThemeContext);

  const search = () => {
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
      <MenuIconButton onClick={search} icon={["fas", "search"]} />
      <Modal
        style={customStyles()}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          document.body.removeAttribute("style");
          setModalIsOpen(false);
        }}
      >
        <PostSearchBar
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </>
  );
}
