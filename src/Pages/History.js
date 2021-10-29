import { useUser } from "../Context/user/userContext";
import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";
import { historyAdd, historyClear } from "../Services/user.service";

export default function History() {
  const {
    userState: { history },
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

  const clearHistory = async (video) => {
    let promise = historyClear(video);
    userDispatch({ type: "CLEAR_HISTORY" });
    let response = await promise;
    if (!response.success) {
      console.error("not cleared history");
    }
  };

  return (
    <div>
      <button
        className="primary-btn2"
        onClick={() => {
          clearHistory();
        }}
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
              onClick={() => {
                addHistory(video);
              }}
            >
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
