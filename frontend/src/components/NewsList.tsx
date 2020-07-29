import React, { useState, useEffect } from "react";
import { getNewsHeadline } from "../services/api";
import styles from "../index.css";
import moment from "moment";

export default function NewsList(): JSX.Element {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsHeadline().then((res) => res && setNews(res.slice(0, 5)));
  }, []);
  return (
    <div className={styles.news}>
      <div className={styles.news_head}>What&#39;s happening</div>
      {news &&
        news.map((item) => (
          <div key={item.url} className={styles.news_card}>
            <div className={styles.news_publishedAt}>
              {moment(item.datePublished).format("MMMM Do YYYY, h:mm a")}
            </div>
            <a
              className={styles.news_article}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <p className={styles.news_title}>{item.name}</p>
              {item.image.thumbnail.contentUrl && (
                <img
                  src={item.image.thumbnail.contentUrl}
                  style={{ height: "50px", borderRadius: "10px" }}
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
