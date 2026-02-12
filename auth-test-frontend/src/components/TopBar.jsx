import React from "react";
import { useAuth } from "../context/AuthContext"; // 👈 USE CONTEXT
import "./TopBar.css";

/* ========= CATEGORY ICONS ========= */

const CrimeIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M160-200h640v-80H160v80Zm160-240h80v-120q0-33 23.5-56.5T480-640v-80q-66 0-113 47t-47 113v120Zm0-80h400v-200q0-83-58.5-141.5T480-760q-83 0-141.5 58.5T280-560v200ZM160-120q-33 0-56.5-23.5T80-200v-80q0-33 23.5-56.5T160-360h40v-200q0-117 81.5-198.5T480-840q117 0 198.5 81.5T760-560v200h40q33 0 56.5 23.5T880-280v80q0 33-23.5 56.5T800-120H160Z"/>
  </svg>
);

const SportsIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M600-392 488-280q-12 12-28 12t-28-12L92-620q-12-12-12-27t12-27l112-112q12-12 29-12t29 12l338 338q12 12 12 28t-12 28Z"/>
  </svg>
);

const MoviesIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M160-120v-720h80v80h80v-80h320v80h80v-80h80v720h-80v-80h-80v80H320v-80h-80v80Zm240-80h160v-560H400v560Z"/>
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M300-80q-59 0-99.5-40.5T160-220v-520q0-58 40.5-99t99.5-41h500v600H300Z"/>
  </svg>
);

const JobsIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80h320v80h160v440H160Z"/>
  </svg>
);

const TechnologyIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M323-160q-11 0-20.5-5.5T288-181l-78-139h58l40 80h92v-40h-68l-40-80H188Z"/>
  </svg>
);

const WeatherIcon = () => (
  <svg viewBox="0 -960 960 960" className="category-svg">
    <path d="M300-360q-91 0-155.5-64.5T80-580q0-83 55-145t136-73q32-57 87.5-89.5T480-920q90 0 156.5 57.5T717-719q69 6 116 57t47 122q0 75-52.5 127.5T700-360H300Z"/>
  </svg>
);

/* ========= PROFILE ICON ========= */

const ManageAccountIcon = () => (
  <svg viewBox="0 -960 960 960" className="profile-svg">
    <path d="M287-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14v80H160v56h252Z"/>
  </svg>
);

/* ========= TOP BAR ========= */

function TopBar() {
  const { user } = useAuth(); // ✅ FROM CONTEXT
  const name = user?.name?.split(" ")[0] || "User";

  const categoryMap = {
    Crime: CrimeIcon,
    Sports: SportsIcon,
    Movies: MoviesIcon,
    Education: EducationIcon,
    Jobs: JobsIcon,
    Technology: TechnologyIcon,
    Weather: WeatherIcon,
  };

  return (
    <header className="topbar">

      {/* LEFT */}
      <div className="topbar-left">
        <span className="topbar-logo">Global Chronicle</span>
      </div>

      {/* CENTER — ONLY USER SELECTED */}
      <div className="topbar-center">
        {user?.preferences?.map((label) => {
          const Icon = categoryMap[label];
          if (!Icon) return null;

          return (
            <div key={label} className="category-icon">
              <Icon />
              <span className="icon-label">{label}</span>
            </div>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <ManageAccountIcon />
        <span className="profile-text">Hey {name}</span>
      </div>

    </header>
  );
}

export default TopBar;
