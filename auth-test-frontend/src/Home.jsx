import TopBar from "./components/TopBar";
import HeroCarousel from "./components/HeroCarousel";
import ImportantNewsCarousel from "./components/ImportantNewsCarousel";

import "./home.css";
import "./components/importantNews.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userInterests = user?.interests || [];

  return (
    <div className="home-layout">
      <TopBar />

      <div className="home-content">
        <h2>Important for You</h2>
        <ImportantNewsCarousel userInterests={userInterests} />
      </div>

      <div className="home-content">
        <h2>Featured News</h2>
        <HeroCarousel interests={userInterests} />
      </div>
    </div>
  );
}

export default Home;
