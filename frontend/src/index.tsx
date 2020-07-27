import Home from "./Home";
import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import { Auth0Provider } from "@auth0/auth0-react";
import queryString from "query-string";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { StateProvider } from "./store/ThemeContext";

library.add(fab, fas, far);

ReactDOM.render(
  <StateProvider>
    <Auth0Provider
      domain="hens-and-roosters.us.auth0.com"
      clientId="BHateqNk8bsUmq9aA6mSv52K3gpLPJIZ"
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/post/:id" component={ItemDetail} />
          <Route
            render={(props) => {
              return <Home query={queryString.parse(props.location.search)} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    </Auth0Provider>
  </StateProvider>,
  document.getElementById("root")
);
