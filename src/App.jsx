import React, { useState } from "react";
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
    `/images/${team}.png`,
    `/images/${team}char.png`,
    `/images/${team}ani.png`,
  ];

  const [currentImg, setCurrentImg] = useState(images[0]);
  const [hoverIndex, setHoverIndex] = useState(1);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    setCurrentImg(images[hoverIndex]);

    setHoverIndex((prev) => (prev + 1 >= images.length ? 1 : prev + 1));
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setCurrentImg(images[0]);
  };

  return (
    <div
      className={`magic-container ${hovered ? "pop-up" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
