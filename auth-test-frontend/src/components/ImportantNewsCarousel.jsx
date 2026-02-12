import { useEffect, useState } from "react";
import axios from "axios";

const ImportantNewsCarousel = ({ userInterests }) => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1️⃣ Fetch Kerala news
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/news/kerala")
      .then((res) => setNews(res.data || []))
      .catch(console.error);
  }, []);

  // 2️⃣ Filter by user interests
  const filteredNews = news.filter((n) =>
    userInterests.some((interest) =>
      n.title?.toLowerCase().includes(interest.toLowerCase())
    )
  );

  // 3️⃣ Decide which list to rotate
  const finalNewsList = filteredNews.length > 0 ? filteredNews : news;

  // 4️⃣ Change news every 15 seconds
  useEffect(() => {
    if (!finalNewsList.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % finalNewsList.length);
    }, 15000); // ✅ 15 seconds

    return () => clearInterval(interval);
  }, [finalNewsList]);

  if (!finalNewsList.length) {
    return (
      <div className="important-news-wrapper">
        <p style={{ opacity: 0.6 }}>Loading important news…</p>
      </div>
    );
  }

  const item = finalNewsList[currentIndex];

  return (
    <div className="important-news-wrapper">
      <div className="important-news-card">
        <h4>{item.title}</h4>

        <p style={{ fontSize: "13px", opacity: 0.7 }}>
          Source: {item.source}
        </p>

        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="read-more"
        >
          Read full story →
        </a>
      </div>
    </div>
  );
};

export default ImportantNewsCarousel;
