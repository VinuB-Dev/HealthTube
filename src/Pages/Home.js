import "../styles.css";
import React from "react";
import VideoList from "../Components/VideoList/VideoList";
import { useVideo } from "../Context/data/dataContext";

export default function Home() {
  const { Filteredvideos } = useVideo();
  return (
    <div>
      <div className="grid">
        <VideoList videos={Filteredvideos} />
      </div>
    </div>
  );
}
