import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PacmanLoader } from "halogenium";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, Link, useHistory } from "react-router-dom";
import styles from "../index.css";
import { getBlogById, updateBlog } from "../services/api";
import getUserName from "../utils";
import BottomPane from "./BottomPane";
import ItemBottomBar from "./ItemBottomBar";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import UserIcon from "./UserIcon";

type Props = RouteComponentProps<{ id: string }>;

export default function ItemDetail(props: Props): JSX.Element {
  const [blog, setBlog] = useState({
    name: undefined,
    id: undefined,
    content: undefined,
    imageURL: undefined,
    gifURL: undefined,
    favers: undefined,
    updatedAt: undefined,
    createdAt: undefined,
  });
  const { match } = props;
  const { id } = match.params;
  const [updateStateFlag, setUpdateStateFlag] = useState(false);
  const [content, setContent] = useState("");
  const history = useHistory();

  useEffect(() => {
    getBlogById(id).then((item) => {
      setBlog(item);
      setContent(item.content);
    });
  }, []);

  if (!blog.name) {
    return (
      <div className={styles.loading}>
        <PacmanLoader color="#2AA1F2" size="16px" />
      </div>
    );
  }

  let url = "";
  if (blog.imageURL) url = blog.imageURL;
  else if (blog.gifURL) url = blog.gifURL;

  const mainContent = updateStateFlag ? (
    <>
      <textarea
        className={styles.text_area}
        name="recomment"
        id="recomment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.edit}>
        <button
          type="button"
          className={styles.btn_post}
          onClick={() => {
            updateBlog(id, content).then(() => history.goBack());
          }}
        >
          Update
        </button>
      </div>
    </>
  ) : (
    <>
      <div className={styles.detail_content}>{blog.content}</div>
      {url && (
        <img
          src={url}
          style={{ height: "200px", borderRadius: "20px" }}
          alt="content"
        />
      )}
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
    <>
      <div className={styles.pane_container}>
        <LeftPane />
        <div className={styles.center_pane}>
          <div className={styles.center_pane_head}>
            <Link className={styles.btn_arrow} to="/">
              <FontAwesomeIcon icon={["fas", "arrow-left"]} color="#2AA1F2" />
            </Link>
            <h1>cock-a-doodle-doo</h1>
          </div>
          <div className={styles.detail_area}>
            <div className={styles.left_side}>
              <UserIcon username={blog.name} />
            </div>
            <div className={styles.right_side}>
              <p className={styles.username}>{blog.name}</p>
              {mainContent}
            </div>
          </div>
          <BottomPane />
        </div>
        <RightPane />
      </div>
    </>
  );
}
