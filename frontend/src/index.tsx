import Home from "./Home";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="hens-and-roosters.us.auth0.com"
    clientId="BHateqNk8bsUmq9aA6mSv52K3gpLPJIZ"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/post/:id" component={ItemDetail} />
      </Switch>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
