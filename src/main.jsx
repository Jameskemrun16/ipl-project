import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuctionProvider } from "./context/AuctionContext";

import App from "./App";
import NameEntry from "./pages/NameEntry";
import TeamSelection from "./pages/TeamSelection";
import TeamPage from "./pages/TeamPage";

import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuctionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<NameEntry />} />

            <Route path="team-selection" element={<TeamSelection />} />

            <Route path="team/:teamName" element={<TeamPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuctionProvider>
  </React.StrictMode>,
);
