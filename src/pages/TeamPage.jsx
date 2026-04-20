import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContext";

const TeamPage = () => {
  const { team } = useParams();
  const navigate = useNavigate();

  const { selections } = useContext(AuctionContext);

  const owner = Object.keys(selections).find((p) => selections[p] === team);

  return (
    <>
      <div className="team-page">
        <div className="team-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <h1>{team.toUpperCase()}</h1>
        </div>

        <div className="team-info">
          <div className="team-card">
            <h3>Owner</h3>
            <p>{owner}</p>
          </div>

          <div className="team-card">
            <h3>Budget</h3>
            <p>100 Cr</p>
          </div>
        </div>

        <div className="player-slots">
          <h2>Players</h2>

          <div className="slots-grid">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="player-card empty-slot">
                Empty Slot
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
