import moment from "moment";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getBlogById, updateBlog } from "../../../../services/api";
import { blogDict } from "../../../../typing/blogType";
import getUserName from "../../../../utils";
import DefaultButton from "../../../atoms/Button/DefaultButton";
import Img from "../../../atoms/Img/Img";
import Textarea from "../../../atoms/Input/Textarea";
import Loading from "../../../atoms/Loading/Loading";
import DetailBottomBar from "../../../molecules/DetailBottomBar/DetailBottomBar";
import Header from "../../../molecules/Header/CenterHeader";
import IconDocContainer from "../../../molecules/IconDocContainer/IconDocContainer";
import styles from "./ItemDetail.css";

type Props = RouteComponentProps<{ id: string }>;

export default function ItemDetail(props: Props): JSX.Element {
  const { match } = props;
  const { id } = match.params;
  const history = useHistory();
  const [updateStateFlag, setUpdateStateFlag] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [blog, setBlog] = useState<blogDict>({
    name: undefined,
    id: undefined,
    content: undefined,
    imageURL: undefined,
    gifURL: undefined,
    favers: undefined,
    updatedAt: undefined,
    createdAt: undefined,
  });

  useEffect(() => {
    getBlogById(id).then((item) => {
      setBlog(item);
      setContent(item.content);
    });
  }, []);

  if (!blog.name) {
    return <Loading />;
  }

  let url = "";
  if (blog.imageURL) url = blog.imageURL;
  else if (blog.gifURL) url = blog.gifURL;

  const mainContent = updateStateFlag ? (
    <>
      <Textarea
        name="recomment"
        id="recomment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.bottom_container}>
        <div className={styles.post_container}>
          <DefaultButton
            onClick={() => {
              updateBlog(id, content).then(() => history.goBack());
            }}
          >
            Update
          </DefaultButton>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className={styles.contents}>{blog.content}</div>
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

  return (
    <>
      <Header backButton>cock-a-doodle-doo</Header>
      <div className={styles.detail_area}>
        <IconDocContainer username={blog.name}>{mainContent}</IconDocContainer>
      </div>
    </>
  );
}
