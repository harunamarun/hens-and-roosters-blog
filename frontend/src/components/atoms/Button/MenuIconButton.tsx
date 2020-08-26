import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Button.css";

type PropsType = FontAwesomeIconProps & {
  onClick?: () => void;
};
const MenuIconButton = (props: PropsType): JSX.Element => {
  const { onClick, icon, color = "#2AA1F2" } = props;

  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={icon}
      color={color}
      className={styles.menuicon}
    />
  );
};

export default MenuIconButton;

MenuIconButton.defaultProps = {
  onClick: undefined,
};
