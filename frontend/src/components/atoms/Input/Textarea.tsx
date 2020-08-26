import React from "react";
import styles from "./Input.css";

type PropsType = {
  name: string;
  id: string;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  placeholder?: string;
};

export default function Textarea(props: PropsType): JSX.Element {
  const { name, id, value, onChange, placeholder } = props;
  return (
    <textarea
      className={styles.text_area}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      rows={3}
      placeholder={placeholder}
    />
  );
}

Textarea.defaultProps = {
  placeholder: "",
};
