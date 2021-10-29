import { useUser } from "../Context/user/userContext";
import { historyAdd, watchlaterRemove } from "../Services/user.service";
import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";

export default function Watchlater() {
  const {
    userState: { watchlater },
    userDispatch
  } = useUser();

  const removewatchlater = async (video) => {
    let promise = watchlaterRemove(video);
    userDispatch({
      type: "REMOVE_FROM_WATCHLATER",
      payload: video
    });
    let response = await promise;
    if (!response.success) {
      userDispatch({
        type: "ADD_TO_WATCHLATER",
        payload: video
      });
    }
  };

  const addHistory = async (video) => {
    let promise = historyAdd(video);
    userDispatch({ type: "ADD_TO_HISTORY", payload: video });
    let response = await promise;
    if (!response.success) {
      console.error("not added to history");
    }
  };

  return (
    <div>
      <h1>WatchLater : {watchlater.length}</h1>
      <div className="grid">
        {watchlater.map((video) => {
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
              onClick={() => addHistory(video)}
            >
              <Link
                to={"/watchlater"}
                className="close-card"
                onClick={() => {
                  removewatchlater(video);
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
