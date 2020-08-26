import React, { useContext } from "react";
import { ThemeContext } from "../../../store/ThemeContext";
import MenuIconButton from "./MenuIconButton";

export default function DarkModeButton(): JSX.Element {
  const { state, dispatch } = useContext(ThemeContext);

  return (
    <>
      {state.isDark === "true" ? (
        <MenuIconButton
          onClick={() => dispatch({ type: "LIGHT_MODE" })}
          icon={["fas", "sun"]}
        />
      ) : (
        <MenuIconButton
          onClick={() => dispatch({ type: "DARK_MODE" })}
          icon={["fas", "moon"]}
        />
      )}
    </>
  );
}
