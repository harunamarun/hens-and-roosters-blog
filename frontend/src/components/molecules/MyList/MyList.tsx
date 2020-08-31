import moment from "moment";
import { ParsedQuery } from "query-string";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useIntersection } from "use-intersection";
import { BlogType } from "../../../typing/blogType";
import { getBlogs } from "../../../utils/api";
import { NetworkError, NetworkStatusError } from "../../../utils/errors";
import Img from "../../atoms/Img/Img";
import Loading from "../../atoms/Loading/Loading";
import IconDocContainer from "../IconDocContainer/IconDocContainer";
import styles from "./MyList.css";

type PropsType = {
  query: ParsedQuery<string>;
};

export default function MyList(props: PropsType): JSX.Element {
  const {
    query: { keyword },
  } = props;
  const limit = 20;
  const target = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(target);
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [start, setStart] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (intersecting && !loading && !end) {
      setLoading(true);
      if (typeof keyword === "string" || keyword === undefined) {
        getBlogs(keyword, start, limit)
          .then((items) => {
            if (items.length > 0) {
              setBlogs(blogs.concat(items));
              setLoading(false);
              setStart(start + limit);
            } else {
              setLoading(false);
              setEnd(true);
            }
          })
          .catch((err) => {
            setLoading(false);
            if (
              err instanceof NetworkError ||
              err instanceof NetworkStatusError
            ) {
              setMessage(err.message);
            } else {
              setMessage("unknownError");
            }
          });
      }
    }
  }, [intersecting]);

  return (
    <>
      {blogs &&
        blogs.map((item) => {
          return (
            <Link to={`/post/${item.id}`} key={item.id} className={styles.card}>
              <IconDocContainer
                username={item.name}
                time={moment
                  .utc(item.createdAt, "YYYY-MM-DD hh:mm:ss")
                  .fromNow()}
              >
                <>
                  <p className={styles.content}>{item.content}</p>
                  <div className={styles.image_container}>
                    {item.imageURL && (
                      <Img alt="postedimage" src={item.imageURL} />
                    )}
                    {item.gifURL && <Img alt="postedgif" src={item.gifURL} />}
                  </div>
                </>
              </IconDocContainer>
            </Link>
          );
        })}
      <div ref={target}>
        {loading && <Loading />}
        {message && <div>{message}</div>}
      </div>
    </>
  );
}
