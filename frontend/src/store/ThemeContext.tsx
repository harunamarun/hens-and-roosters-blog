import React, { createContext, useReducer } from "react";

type StateType = {
  isDark: string;
};

type ActionType = {
  type: string;
};

type ContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

type ColorSetType = {
  backgroundColor: string;
  disabledColor: string;
  borderColor: string;
  subBackgroundColor: string;
  textColor: string;
};

const elementStyle = document.documentElement.style;

const setTheme = ({
  backgroundColor,
  disabledColor,
  borderColor,
  subBackgroundColor,
  textColor,
}: ColorSetType): void => {
  elementStyle.setProperty("--main-background-color", backgroundColor);
  elementStyle.setProperty("--disabled-blue-color", disabledColor);
  elementStyle.setProperty("--main-border-color", borderColor);
  elementStyle.setProperty("--main-subbackground-color", subBackgroundColor);
  elementStyle.setProperty("--main-text-color", textColor);
};

const setLightTheme = (): void => {
  setTheme({
    backgroundColor: "#FFFFFF",
    disabledColor: "#86D0F9",
    borderColor: "#E6ECF0",
    subBackgroundColor: "#F5F8FA",
    textColor: "#14171A",
  });
};

const setDarkTheme = (): void => {
  setTheme({
    backgroundColor: "#16202B",
    disabledColor: "#1A608E",
    borderColor: "#253341",
    subBackgroundColor: "#192734",
    textColor: "#E1E1E1",
  });
};

let localIsDarkMode = localStorage.getItem("darkMode");
if (!localIsDarkMode) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localIsDarkMode = "true";
  } else {
    localIsDarkMode = "false";
  }
}

if (localIsDarkMode === "true") {
  setDarkTheme();
} else {
  setLightTheme();
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "DARK_MODE":
      localStorage.setItem("darkMode", "true");
      setDarkTheme();
      return { ...state, isDark: "true" };
    case "LIGHT_MODE":
      localStorage.setItem("darkMode", "false");
      setLightTheme();
      return { ...state, isDark: "false" };
    default:
      throw new Error();
  }
};

const initialState = { isDark: localIsDarkMode };

export const ThemeContext = createContext({} as ContextType);

export const StateProvider = ({
  children,
}: Record<string, JSX.Element>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
