import { useVideo } from "../Context/context";
import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
export default function Playlist() {
  const {
    state: { playlists },
    dispatch
  } = useVideo();

  return (
    <div>
      <h2>Playlists {playlists.length}</h2>
      {playlists.map((playlist) => {
        const { id, name, video } = playlist;
        return (
          <div key={id}>
            <div className="playlist-row">
              <div>{name}</div>
              <div
                className="delete"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_PLAYLIST",
                    payload: playlist
                  });
                }}
              >
                <AiFillDelete />
              </div>
            </div>
            <div className="grid">
              {video.map((v) => {
                const {
                  id,
                  embedId,
                  title,
                  views,
                  channel,
                  age,
                  thumbnailImgUrl
                } = v;
                return (
                  <Link
                    to={"/video/" + embedId}
                    key={id}
                    className="card"
                    onClick={() =>
                      dispatch({ type: "ADD_TO_HISTORY", payload: v })
                    }
                  >
                    <Link
                      to={"/playlist"}
                      className="close-card"
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_PLAYLIST",
                          payload: { playlist: playlist, video: video }
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
      })}
    </div>
  );
}
