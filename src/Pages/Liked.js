import { useVideo } from "../Context/context";
import "../Components/VideoCard/VideoCard_module.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
export default function Liked() {
  const {
    state: { liked },
    dispatch
  } = useVideo();

  return (
    <div>
      <h1>Liked videos : {liked.length}</h1>
      <div className="grid">
        {liked.map((video) => {
          const {
            id,
            embedId,
            title,
            views,
            channel,
            age,
            thumbnailImgUrl
          } = video;
          return (
            <Link
              to={"/video/" + embedId}
              key={id}
              className="card"
              onClick={() =>
                dispatch({ type: "ADD_TO_HISTORY", payload: video })
              }
            >
              <Link
                to={"/liked"}
                className="close-card"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_LIKED_VIDEOS",
                    payload: video
                  });
                }}
              >
                &times;
              </Link>
              <div>
                <img src={thumbnailImgUrl} alt="" />
              </div>
              <div className="card-content">
                <div className="logo">
                  <img src={channel.logo} alt="" />
                </div>
                <div className="content">
                  <div className="pad1">{title}</div>
                  <div className="pad1 silver">{channel.title}</div>
                  <div className=" silver">
                    <span style={{ marginLeft: "5px" }}>
                      {views % 1000}k views •
                    </span>
                    <span> {age} ago</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
