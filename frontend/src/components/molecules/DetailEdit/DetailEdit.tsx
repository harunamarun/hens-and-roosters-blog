import React from "react";
import { useHistory } from "react-router-dom";
import { updateBlog } from "../../../utils/api";
import DefaultButton from "../../atoms/Button/DefaultButton";
import Textarea from "../../atoms/Input/Textarea";
import styles from "./DetailEdit.css";

type PropsType = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  id: string;
};

export default function DetailEdit(props: PropsType): JSX.Element {
  const { content, setContent, id } = props;
  const history = useHistory();

  return (
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
  );
}
