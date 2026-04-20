import React, { createContext, useState } from "react";

export const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [selections, setSelections] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  return (
    <AuctionContext.Provider
      value={{
        players,
        setPlayers,
        selections,
        setSelections,
        currentPlayerIndex,
        setCurrentPlayerIndex,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
