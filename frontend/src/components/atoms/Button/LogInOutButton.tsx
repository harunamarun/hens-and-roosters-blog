import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import MenuIconButton from "./MenuIconButton";

export default function LoginOutButton(): JSX.Element {
  const { user } = useAuth0();
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {user ? (
        <MenuIconButton
          onClick={() => logout()}
          icon={["fas", "sign-out-alt"]}
        />
      ) : (
        <MenuIconButton
          onClick={() => loginWithRedirect()}
          icon={["fas", "sign-in-alt"]}
        />
      )}
    </>
  );
}
