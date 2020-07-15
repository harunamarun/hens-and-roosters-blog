import React, { useState, useEffect } from "react";
import { getNewsHeadline } from "../services/api";
import styles from "../index.css";
import { Link } from "react-router-dom";

export default function NewsList(): JSX.Element {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNewsHeadline().then((res) => setNews(res));
  }, []);
  return (
    <div className={styles.news}>
      <div className={styles.news_head}>What's happening</div>
      {news &&
        news.map((item) => (
          <div key={item.url} className={styles.news_card}>
            <div className={styles.news_publishedAt}>{item.publishedAt}</div>
            <a className={styles.news_article} href={item.url} target="_blank">
              <p className={styles.news_title}>{item.title}</p>
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  style={{ height: "50px", borderRadius: "10px" }}
                />
              )}
            </a>
          </div>
        ))}
      <footer style={{ margin: "5px" }}>
        <small>
          powered by <a href="https://newsapi.org">NewsAPI.org</a>
        </small>
      </footer>
    </div>
  );
}
