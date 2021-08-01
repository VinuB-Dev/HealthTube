import { useUser } from "../Context/user/userContext";
import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";
import { historyAdd, likedRemove } from "../Services/user.service";

export default function Liked() {
  const {
    userState: { liked },
    userDispatch
  } = useUser();

  const addHistory = async (video) => {
    let promise = historyAdd(video);
    userDispatch({ type: "ADD_TO_HISTORY", payload: video });
    let response = await promise;
    if (!response.success) {
      console.error("not added to history");
    }
  };

  const removeLiked = async (video) => {
    let promise = likedRemove(video);
    userDispatch({
      type: "REMOVE_FROM_LIKED_VIDEOS",
      payload: video
    });
    let response = await promise;
    if (!response.success) {
      userDispatch({
        type: "ADD_TO_LIKED_VIDEOS",
        payload: video
      });
    }
  };

  return (
    <div>
      <h1>Liked videos : {liked.length}</h1>
      <div className="grid">
        {liked.map((video) => {
          const {
            _id,
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
              key={_id}
              className="card"
              onClick={() => addHistory(video)}
            >
              <Link
                to={"/liked"}
                className="close-card"
                onClick={() => {
                  removeLiked(video);
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
