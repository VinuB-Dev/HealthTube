import "./styles.css";
import React from "react";
import Home from "./Pages/Home";
import Liked from "./Pages/Liked";
import Navbar from "./Components/Navbar/Navbar";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import History from "./Pages/History";
import Playlist from "./Pages/Playlist";
import Watchlater from "./Pages/Watchlater";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Toolbar from "./Components/Toolbar/Toolbar";
import { useVideo } from "./Context/context";

export default function App() {
  const { modal } = useVideo();
  return (
    <div className="App">
      <div style={{ display: modal ? "none" : "unset" }}>
        <Navbar />
      </div>
      <div className="routes">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:embedId" element={<VideoPlayer />}></Route>
          <Route path="/liked" element={<Liked />} />
          <Route path="/history" element={<History />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/watchlater" element={<Watchlater />} />
        </Routes>
      </div>
      <div style={{ display: modal ? "none" : "unset" }}>
        <Toolbar />
      </div>
    </div>
  );
}
