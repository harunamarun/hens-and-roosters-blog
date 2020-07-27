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

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "DARK_MODE":
      localStorage.setItem("darkMode", "true");
      return { ...state, isDark: "true" };
    case "LIGHT_MODE":
      localStorage.setItem("darkMode", "false");
      return { ...state, isDark: "false" };
    default:
      throw new Error();
  }
};

let localIsDarkMode = localStorage.getItem("darkMode");
if (!localIsDarkMode) {
  console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localIsDarkMode = "true";
  } else {
    localIsDarkMode = "false";
  }
}

const initialState = { isDark: localIsDarkMode };
export const ThemeContext = createContext({} as ContextType);

export const StateProvider = ({
  children,
}: Record<string, unknown>): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
