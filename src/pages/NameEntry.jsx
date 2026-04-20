import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuctionContext } from "../context/AuctionContext";

const NameEntry = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { players, setPlayers } = useContext(AuctionContext);

  const handleAdd = () => {
    if (!name.trim()) return;

    setPlayers([...players, name]);
    setName("");
  };

  const handleStart = () => {
    if (players.length === 0) {
      alert("Enter at least one player to proceed");
      return;
    }

    navigate("/team-selection");
  };

  return (
    <div className="name-entry-page">
      <div className="name-entry-container">
        <h1 className="mythic-title">THE AUCTION OF LEGENDS</h1>

        <p className="mythic-subtitle">Enter the Challengers</p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Warrior Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button className="mythic-btn add-btn" onClick={handleAdd}>
            Add Challenger
          </button>
        </div>

        <div className="player-list">
          {players.map((player, index) => (
            <div
              key={index}
              className="player-item"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {player}
            </div>
          ))}
        </div>

        <button className="mythic-btn start-btn" onClick={handleStart}>
          Begin Team Selection
        </button>
      </div>
    </div>
  );
};

export default NameEntry;
