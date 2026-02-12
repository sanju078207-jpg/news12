// src/components/HeroCarousel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HeroCarousel.css";

const HeroCarousel = ({ interests }) => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedNews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || interests.length === 0) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:5000/api/news/featured?categories=${interests.join(",")}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVideos(res.data || []);
      } catch (err) {
        console.error("Failed to load featured news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedNews();
  }, [interests]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === videos.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? videos.length - 1 : prev - 1
    );
  };

  if (loading) return null;
  if (videos.length === 0) return null;

  const currentVideo = videos[currentIndex];

  return (
    <div className="carousel-container">
      {/* Left Arrow */}
      <button className="nav-btn left" onClick={prevSlide}>
        &#8249;
      </button>

      {/* Video Card */}
      <div className="video-card">
        <div className="video-wrapper">
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="video-thumbnail"
          />

          <div className="play-button-overlay">
            <div className="play-icon">▶</div>
          </div>
        </div>
      </div>

      {/* Right Arrow */}
      <button className="nav-btn right" onClick={nextSlide}>
        &#8250;
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {videos.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
