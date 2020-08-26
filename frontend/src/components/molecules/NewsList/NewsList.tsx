import moment from "moment";
import React, { useState, useEffect } from "react";
import { getNewsHeadline } from "../../../services/api";
import styles from "./NewsList.css";

export default function NewsList(): JSX.Element {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsHeadline().then((res) => res && setNews(res.slice(0, 5)));
  }, []);
  return (
    <div className={styles.news_container}>
      <div className={styles.header}>What&#39;s happening</div>
      {news &&
        news.map((item) => (
          <div key={item.url} className={styles.news_card}>
            <div className={styles.publishedAt}>
              {moment(item.datePublished).format("MMMM Do YYYY, h:mm a")}
            </div>
            <a
              className={styles.article}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <p className={styles.title}>{item.name}</p>
              {item.image.thumbnail.contentUrl && (
                <img
                  alt="newsimage"
                  src={item.image.thumbnail.contentUrl}
                  className={styles.image}
                />
              )}
            </a>
          </div>
        ))}
      <footer>
        <small>
          powered by <a href="https://www.bing.com/news">Bing News</a>
        </small>
      </footer>
    </div>
  );
}
