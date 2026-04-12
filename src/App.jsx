import React, { useState, useEffect } from "react";
import "./App.css";

const teams = [
  "csk",
  "dc",
  "gt",
  "kkr",
  "lsg",
  "mi",
  "rcb",
  "srh",
  "rr",
  "pbks",
];

const HoverCard = ({ team }) => {
  const images = [
    `/images/${team}.png`, // Default Logo
    `/images/${team}char.png`, // Character
    `/images/${team}ani.png`, // Animal
  ];

  const [currentImg, setCurrentImg] = useState(images[0]);
  const [hoverIndex, setHoverIndex] = useState(1);
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop Hover
  const handleMouseEnter = () => {
    if (!isMobile) {
      setActive(true);
      setCurrentImg(images[hoverIndex]);

      setHoverIndex((prev) => (prev + 1 >= images.length ? 1 : prev + 1));
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActive(false);
      setCurrentImg(images[0]);
    }
  };

  // Mobile Tap
  const handleClick = () => {
    if (isMobile) {
      setActive(true);
      setCurrentImg(images[hoverIndex]);

      setHoverIndex((prev) => (prev + 1 >= images.length ? 1 : prev + 1));
    }
  };

  return (
    <div
      className={`magic-container ${active ? "active" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="image-stage">
        <img src={currentImg} className="hover-img" alt={team} />
      </div>
    </div>
  );
};

const HoverGallery = () => {
  return (
    <div className="gallery">
      {teams.map((team, index) => (
        <HoverCard key={index} team={team} />
      ))}
    </div>
  );
};

export default HoverGallery;
