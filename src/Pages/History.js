import { useVideo } from "../Context/context";
import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";

export default function History() {
  const {
    state: { history },
    dispatch
  } = useVideo();

  return (
    <div>
      <button
        className="primary-btn2"
        onClick={() => dispatch({ type: "CLEAR_HISTORY" })}
      >
        Clear All
      </button>
      <h1>History videos : {history.length}</h1>

      <div className="grid">
        {history.map((video) => {
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
