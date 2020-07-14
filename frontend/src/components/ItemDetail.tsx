import React, { useEffect, useState } from "react";
import { getBlogById, updateBlog } from "../services/api";
import ItemBottomBar from "./ItemBottomBar";
import styles from "../index.css";
import LeftPane from "./LeftPane";
import moment from "moment";
import UserIcon from "./UserIcon";
import { getUserName } from "../utils";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ id: string }>;

export default function ItemDetail(props: Props): JSX.Element {
  const [blog, setBlog] = useState({
    name: undefined,
    id: undefined,
    content: undefined,
    imageURL: undefined,
    favers: undefined,
    updatedAt: undefined,
    createdAt: undefined,
  });
  const id = props.match.params.id;
  const [updateStateFlag, setUpdateStateFlag] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    getBlogById(id).then((item) => {
      console.log("item", item.createdAt);
      setBlog(item);
      setContent(item.content);
    });
  }, []);

  if (!blog.name) {
    return <div>Loading</div>;
  }

  const mainContent = updateStateFlag ? (
    <>
      <div className={styles.edit}>
        <label htmlFor="recomment"></label>
        <textarea
          className={styles.text_area}
          name="recomment"
          id="recomment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className={styles.btn_post}
          onClick={() => {
            updateBlog(id, content).then(() => location.reload());
          }}
        >
          Update
        </button>
      </div>
    </>
  ) : (
    <>
      <div className={styles.detail_content}>{blog.content}</div>
      <img
        src={blog.imageURL}
        style={{ height: "200px", borderRadius: "20px" }}
      />
      <div className={styles.detail_time}>
        posted at:{" "}
        {moment
          .utc(blog.createdAt, "YYYY-MM-DD hh:mm:ss")
          .local()
          .format("HH:mm - MMMM DD, YYYY")}
      </div>
      {blog.createdAt !== blog.updatedAt && (
        <div className={styles.detail_time}>
          last updated at:{" "}
          {moment
            .utc(blog.updatedAt, "YYYY-MM-DD hh:mm:ss")
            .local()
            .format("HH:mm - MMMM DD, YYYY")}
        </div>
      )}

      {blog.name === getUserName() && (
        <ItemBottomBar setUpdateStateFlag={setUpdateStateFlag} id={id} />
      )}
    </>
  );

  return (
    <React.Fragment>
      <div className={styles.pane_container}>
        <LeftPane />
        <div className={styles.center_pane}>
          <h1>cock-a-doodle-doo</h1>
          <div className={styles.detail_area}>
            <div className={styles.left_side}>
              <UserIcon username={blog.name} />
            </div>
            <div className={styles.right_side}>
              <p className={styles.username}>{blog.name}</p>
              {mainContent}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
