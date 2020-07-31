import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../index.css";

const LoginButton = (): JSX.Element => {
  const { loginWithRedirect } = useAuth0();

  return (
    <FontAwesomeIcon
      onClick={() => loginWithRedirect()}
      icon={["fas", "sign-in-alt"]}
      color={"#2AA1F2"}
      className={styles.menuicon}
    />
  );
};

export default LoginButton;
