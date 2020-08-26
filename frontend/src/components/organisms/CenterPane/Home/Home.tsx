import { ParsedQuery } from "query-string";
import React from "react";
import Form from "../../../molecules/Form/Form";
import Header from "../../../molecules/Header/CenterHeader";
import MyList from "../../../molecules/MyList/MyList";

type PropsType = {
  query: ParsedQuery<string>;
};
export default function Home(props: PropsType): JSX.Element {
  const { query } = props;
  return (
    <>
      {query.keyword ? (
        <>
          <Header backButton>{`Search  "${query.keyword}" `}</Header>
          <MyList key={`${query.keyword}`} query={query} />
        </>
      ) : (
        <>
          <Header backButton={false}>Latest cock-a-doodle-doos</Header>
          <Form />
          <MyList query={query} />
        </>
      )}
    </>
  );
}
