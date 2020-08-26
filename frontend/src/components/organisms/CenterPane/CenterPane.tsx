import queryString from "query-string";
import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import Home from "./Home/Home";
import ItemDetail from "./ItemDetail/ItemDetail";

type PropsType = RouteComponentProps<{ id?: string }>;
export default function CenterPane(): JSX.Element {
  return (
    <Switch>
      <Route path="/post/:id" component={ItemDetail} />
      <Route
        render={(props: PropsType) => {
          return <Home query={queryString.parse(props.location.search)} />;
        }}
      />
    </Switch>
  );
}
