import axios from "axios";
import Article from "../models/Article.model.js";

const parseGdeltDate = (seendate) => {
  if (!seendate || seendate.length !== 14) {
    return new Date();
  }

  const year = seendate.slice(0, 4);
  const month = seendate.slice(4, 6);
  const day = seendate.slice(6, 8);
  const hour = seendate.slice(8, 10);
  const minute = seendate.slice(10, 12);
  const second = seendate.slice(12, 14);

  return new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
  );
};

export const fetchKeralaNews = async (language = "eng") => {
  console.log("🚀 fetchKeralaNews() started");

  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=Kerala&mode=ArtList&format=json&sort=DateDesc&maxrecords=20&lang=${language}`;

  try {
    const { data } = await axios.get(url);

    if (!data?.articles) {
      console.log("⚠️ No articles returned from GDELT");
      return;
    }

    console.log(`📰 Articles received: ${data.articles.length}`);

    for (const item of data.articles) {
      await Article.updateOne(
        { url: item.url },
        {
          title: item.title,
          source: item.source,
          url: item.url,
          language,
          region: "kerala",
          publishedAt: parseGdeltDate(item.seendate),
        },
        { upsert: true }
      );
    }

    console.log("✅ Kerala news saved successfully");
  } catch (err) {
    console.error("GDELT fetch error", err.message);
  }
};
