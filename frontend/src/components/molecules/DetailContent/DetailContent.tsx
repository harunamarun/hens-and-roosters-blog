import moment from "moment";
import React from "react";
import { BlogType } from "../../../typing/blogType";
import getUserName from "../../../utils/utils";
import Img from "../../atoms/Img/Img";
import DetailBottomBar from "../DetailBottomBar/DetailBottomBar";
import styles from "./DetailContent.css";

type PropsType = {
  blog: BlogType;
  setUpdateStateFlag: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};
export default function DetailContent(props: PropsType): JSX.Element {
  const { blog, setUpdateStateFlag, id } = props;
  let url = "";
  if (blog.imageURL) url = blog.imageURL;
  else if (blog.gifURL) url = blog.gifURL;

  return (
    <>
      <div className={styles.content}>{blog.content}</div>
      {url && <Img src={url} alt="content" />}
      <div className={styles.time}>
        posted at:
        {moment
          .utc(blog.createdAt, "YYYY-MM-DD hh:mm:ss")
          .local()
          .format("HH:mm - MMMM DD, YYYY")}
      </div>
      {blog.createdAt !== blog.updatedAt && (
        <div className={styles.time}>
          last updated at:
          {moment
            .utc(blog.updatedAt, "YYYY-MM-DD hh:mm:ss")
            .local()
            .format("HH:mm - MMMM DD, YYYY")}
        </div>
      )}

      {blog.name === getUserName() && (
        <DetailBottomBar setUpdateStateFlag={setUpdateStateFlag} id={id} />
      )}
    </>
  );
}
