import React from "react";
import styles from "./Button.css";

export type PropsType = {
  children: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function DefaultButton(props: PropsType): JSX.Element {
  const { children, onClick, disabled } = props;
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={styles.btn_default}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}

DefaultButton.defaultProps = {
  disabled: false,
};
