import { PacmanLoader } from "halogenium";
import moment from "moment";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useIntersection } from "use-intersection";
import styles from "../index.css";
import { getBlogs } from "../services/api";
import { centerPropsType } from "../typing/propsType";
import UserIcon from "./UserIcon";

export default function MyList(props: centerPropsType): JSX.Element {
  const [blogs, setBlogs] = useState([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const { query } = props;
  const limit = 20;

  const target = useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(target);

  useEffect(() => {
    if (intersecting && !loading && !end) {
      setLoading(true);
      getBlogs(query.keyword, start, limit).then((items) => {
        if (items.length > 0) {
          setBlogs(blogs.concat(items));
          setLoading(false);
          setStart(start + limit);
        } else {
          setLoading(false);
          setEnd(true);
        }
      });
    }
  }, [intersecting]);

  return (
    <>
      {blogs.map((item) => {
        return (
          <Link
            to={`/post/${item.id}`}
            key={item.id}
            style={{ textDecoration: "none", color: "#14171A" }}
          >
            <div className={styles.card}>
              <div className={styles.left_side}>
                <UserIcon username={item.name} />
              </div>
              <div className={styles.right_side}>
                <p className={styles.username}>{item.name}</p>•
                <p className={styles.list_time}>
                  {moment.utc(item.createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}
                </p>
                <p className={styles.list_content}>{item.content}</p>
                {item.imageURL && (
                  <div className={styles.list_image}>
                    <img
                      alt="postedimage"
                      src={item.imageURL}
                      style={{
                        height: "200px",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                )}
                {item.gifURL && (
                  <div className={styles.list_image}>
                    <img
                      alt="postedgif"
                      src={item.gifURL}
                      style={{
                        height: "200px",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
      <div ref={target} className={styles.loading_container}>
        {loading && (
          <div className={styles.loading}>
            <PacmanLoader color="#2AA1F2" size="16px" />
          </div>
        )}
      </div>
    </>
  );
}
