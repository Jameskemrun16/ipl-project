import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContext";

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

const fingerprint = "/images_webp/fingerprint1.webp";

const TeamSelection = () => {
  const navigate = useNavigate();

  const {
    players,
    selections,
    setSelections,
    currentPlayerIndex,
    setCurrentPlayerIndex,
  } = useContext(AuctionContext);

  const [activeIndex, setActiveIndex] = useState(null);
  const [imageState, setImageState] = useState({});
  const [hoverCycle, setHoverCycle] = useState({});
  const [isTouch, setIsTouch] = useState(false);

  // 🔥 NEW: preload state
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef([]);

  /* ===============================
     PRELOAD ALL IMAGES (NEW LOGIC)
  =============================== */
  useEffect(() => {
    const allImages = teams.flatMap((team) => [
      `/images_webp/${team}.webp`,
      `/images_webp/${team}char.webp`,
      `/images_webp/${team}ani.webp`,
    ]);

    let count = 0;

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        count++;
        if (count === allImages.length) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        count++;
        if (count === allImages.length) {
          setLoaded(true);
        }
      };
    });
  }, []);

  /* Detect Touch */
  useEffect(() => {
    const detectTouch = () => {
      const touchDevice =
        typeof window !== "undefined" &&
        (window.matchMedia("(hover: none)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0);

      setIsTouch(touchDevice);
    };

    detectTouch();
  }, []);

  /* Click Outside Reset */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current.every((ref) => ref && !ref.contains(e.target))) {
        setActiveIndex(null);
        setImageState({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Team Select */
  const handleTeamSelect = (team) => {
    const currentPlayer = players[currentPlayerIndex];

    if (Object.values(selections).includes(team)) return;

    setSelections({
      ...selections,
      [currentPlayer]: team,
    });

    setCurrentPlayerIndex(currentPlayerIndex + 1);
    navigate(`/team/${team}`);
  };

  const isTeamSelected = (team) => {
    return Object.values(selections).includes(team);
  };

  /* Hover Logic */
  const handleMouseEnter = (index) => {
    if (isTouch) return;

    setActiveIndex(index);

    setImageState((prev) => {
      const cycle = hoverCycle[index] ?? 0;
      return {
        ...prev,
        [index]: cycle === 0 ? 1 : 2,
      };
    });
  };

  const handleMouseLeave = (index) => {
    if (isTouch) return;

    setImageState((prev) => ({
      ...prev,
      [index]: 0,
    }));

    setHoverCycle((prev) => ({
      ...prev,
      [index]: (prev[index] ?? 0) === 0 ? 1 : 0,
    }));

    setActiveIndex(null);
  };

  /* Mobile Click */
  const handleClick = (index) => {
    if (!isTouch) return;

    setActiveIndex(index);

    setImageState((prev) => {
      const current = prev[index] ?? 0;
      const next = (current + 1) % 3;
      return { ...prev, [index]: next };
    });
  };

  /* ===============================
     LOADING SCREEN (BLOCK UI)
  =============================== */
  if (!loaded) {
    return <div className="loading-screen">Loading Mythic Arena...</div>;
  }

  return (
    <>
      {currentPlayerIndex < players.length && (
        <div className="current-player">
          Current Turn : {players[currentPlayerIndex]}
        </div>
      )}

      <div className="gallery">
        {teams.map((team, index) => {
          const images = [
            `/images_webp/${team}.webp`,
            `/images_webp/${team}char.webp`,
            `/images_webp/${team}ani.webp`,
          ];

          const state = imageState[index] ?? 0;
          const currentImage = images[state];
          const disabled = isTeamSelected(team);

          return (
            <div
              key={team}
              ref={(el) => (containerRef.current[index] = el)}
              className={`magic-container ${disabled ? "disabled" : ""}`}
            >
              <div
                className={`hover-container ${
                  activeIndex === index ? "active" : ""
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleClick(index)}
              >
                <div className="image-stage">
                  <img src={currentImage} alt={team} className="hover-img" />
                </div>
              </div>

              <div className="team-name">{team.toUpperCase()}</div>

              {state === 0 && !disabled && (
                <div
                  className="fingerprint-container"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamSelect(team);
                  }}
                >
                  <img src={fingerprint} alt="fingerprint" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="selection-list">
        {Object.entries(selections).map(([player, team]) => (
          <div key={player}>
            {player} → {team.toUpperCase()}
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamSelection;
