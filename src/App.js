import "./styles.css";
import React from "react";
import Home from "./Pages/Home";
import Liked from "./Pages/Liked";
import Navbar from "./Components/Navbar/Navbar";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import History from "./Pages/History";
import Playlist from "./Pages/Playlist";
import Watchlater from "./Pages/Watchlater";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import NotFound from "./Pages/NotFound";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Toolbar from "./Components/Toolbar/Toolbar";
import { useVideo } from "./Context/data/dataContext";
import PrivateRoute from "./PrivateRoute";
export default function App() {
  const { modal } = useVideo();
  return (
    <div className="App">
      <div style={{ display: modal ? "none" : "unset" }}>
        <Navbar />
      </div>
      <div className="routes">
        <Routes>
          <div className="grid">
            <Route path="/" element={<Home />} />
          </div>
          <Route path="/video/:embedId" element={<VideoPlayer />}></Route>
          <PrivateRoute path="/liked" element={<Liked />} />
          <PrivateRoute path="/history" element={<History />} />
          <PrivateRoute path="/playlist" element={<Playlist />} />
          <PrivateRoute path="/watchlater" element={<Watchlater />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div style={{ display: modal ? "none" : "unset" }}>
        <Toolbar />
      </div>
    </div>
  );
}
