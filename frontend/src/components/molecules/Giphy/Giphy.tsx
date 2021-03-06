import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import { Grid } from "@giphy/react-components";
import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import giphyicon from "../../../assets/GIPHY Logo 30px.png";
import styles from "./Giphy.css";

const giphyKey = process.env.GIPHY_KEY;
const giphyFetch = new GiphyFetch(giphyKey);

type gifsGridProps = {
  onGifClick: (gif: IGif, e: React.SyntheticEvent<HTMLElement, Event>) => void;
};

const GridType = ({ onGifClick }: gifsGridProps): JSX.Element => {
  const [word, setWord] = useState<string>("rooster");
  const [width, setWidth] = useState<number>(window.innerWidth);

  const fetchGifsByWord = (offset: number) => {
    return giphyFetch.search(word, { offset, limit: 10 });
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(document.getElementById("center"));
  }, []);
  return (
    <>
      <img src={giphyicon} alt="giphy icon" />
      <div className={styles.giphy_search_bar}>
        <input
          className={styles.search_input}
          type="search"
          id="site-search"
          placeholder="Search "
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
      <Grid
        key={word}
        onGifClick={onGifClick}
        fetchGifs={fetchGifsByWord}
        width={width}
        columns={3}
        gutter={6}
      />
    </>
  );
};

type giphyPropsType = {
  setGifURL: Dispatch<SetStateAction<string>>;
  setPreviewImage: Dispatch<SetStateAction<string>>;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Giphy(props: giphyPropsType): JSX.Element {
  return (
    <>
      <GridType
        onGifClick={(gif, e) => {
          e.preventDefault();
          let url = "";
          if (gif.images.downsized.url) {
            url = gif.images.downsized.url;
          } else if (gif.images.original.url) {
            url = gif.images.original.url;
          } else if (gif.images.original_still.url) {
            url = gif.images.original_still.url;
          }
          props.setGifURL(url);
          props.setPreviewImage(url);
          props.setModalIsOpen(false);
          document.body.removeAttribute("style");
        }}
      />
    </>
  );
}
