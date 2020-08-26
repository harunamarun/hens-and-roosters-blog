import { Auth0Provider } from "@auth0/auth0-react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/pages/App";
import { StateProvider } from "./store/ThemeContext";
import "./index.css";

library.add(fab, fas, far);

ReactDOM.render(
  <StateProvider>
    <Auth0Provider
      domain="hens-and-roosters.us.auth0.com"
      clientId="BHateqNk8bsUmq9aA6mSv52K3gpLPJIZ"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </StateProvider>,
  document.getElementById("root")
);
