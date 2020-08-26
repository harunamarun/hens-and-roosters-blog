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
      {disabled ? (
        <button
          type="button"
          onClick={onClick}
          className={styles.btn_default}
          disabled
        >
          {children}
        </button>
      ) : (
        <button type="button" onClick={onClick} className={styles.btn_default}>
          {children}
        </button>
      )}
    </>
  );
}

DefaultButton.defaultProps = {
  disabled: false,
};
