import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { BlogType } from "../../../../typing/blogType";
import { getBlogById } from "../../../../utils/api";
import { NetworkStatusError, NetworkError } from "../../../../utils/errors";
import Loading from "../../../atoms/Loading/Loading";
import DetailContent from "../../../molecules/DetailContent/DetailContent";
import DetailEdit from "../../../molecules/DetailEdit/DetailEdit";
import Header from "../../../molecules/Header/CenterHeader";
import IconDocContainer from "../../../molecules/IconDocContainer/IconDocContainer";
import styles from "./ItemDetail.css";

type Props = RouteComponentProps<{ id: string }>;

export default function ItemDetail(props: Props): JSX.Element {
  const { match } = props;
  const { id } = match.params;
  const [updateStateFlag, setUpdateStateFlag] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [blog, setBlog] = useState<BlogType>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!blog) {
      setLoading(true);
    }
    getBlogById(id)
      .then((item) => {
        setBlog(item);
        setContent(item.content);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err instanceof NetworkStatusError) {
          if (err.statusCode === 400) {
            setMessage("not found!");
          } else {
            setMessage(err.message);
          }
        } else if (err instanceof NetworkError) {
          setMessage(err.message);
        } else {
          setMessage("unknown Error");
        }
      });
  }, [id]);

  return (
    <>
      <Header backButton>cock-a-doodle-doo</Header>
      {blog && (
        <div className={styles.detail_area}>
          <IconDocContainer username={blog.name}>
            {updateStateFlag ? (
              <DetailEdit id={id} setContent={setContent} content={content} />
            ) : (
              <DetailContent
                id={id}
                blog={blog}
                setUpdateStateFlag={setUpdateStateFlag}
              />
            )}
          </IconDocContainer>
        </div>
      )}
      {loading && <Loading />}
      {message && <div>{message}</div>}
    </>
  );
}
