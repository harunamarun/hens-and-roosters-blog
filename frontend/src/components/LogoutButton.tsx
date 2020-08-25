import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../index.css";

const LogoutButton = (): JSX.Element => {
  const { logout } = useAuth0();

  return (
    <FontAwesomeIcon
      onClick={() => logout()}
      icon={["fas", "sign-out-alt"]}
      color="#2AA1F2"
      className={styles.menuicon}
    />
  );
};

export default LogoutButton;
