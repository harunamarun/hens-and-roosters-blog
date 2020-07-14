import React, { useState, useEffect } from "react";
import { getBlogs } from "../services/api";
import { Link } from "react-router-dom";
import styles from "../index.css";
import UserIcon from "./UserIcon";
import moment from "moment";

export default function MyList(): JSX.Element {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlogs().then((items) => setBlogs(items));
  }, []);

  return (
    <React.Fragment>
      {blogs.map((item) => {
        return (
          <Link
            to={"/post/" + item.id}
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
                      src={item.imageURL}
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
    </React.Fragment>
  );
}
