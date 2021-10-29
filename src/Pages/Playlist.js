import { useUser } from "../Context/user/userContext";
import {
  historyAdd,
  playlistRemove,
  playlistVideoRemove
} from "../Services/user.service";

import "../Components/VideoCard/VideoCard_module.css";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
export default function Playlist() {
  const {
    userState: { playlist },
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

  const removePlaylist = async (playlist) => {
    let promise = playlistRemove(playlist._id);
    userDispatch({ type: "REMOVE_PLAYLIST", payload: playlist });
    let response = await promise;
    if (!response.success) {
      userDispatch({ type: "CREATE_PLAYLIST", payload: playlist });
    }
  };

  const removeFromPlaylist = async (playlist, video) => {
    let promise = playlistVideoRemove(playlist._id, video._id);
    userDispatch({
      type: "REMOVE_FROM_PLAYLIST",
      payload: { playlist: playlist, video: video }
    });
    let response = await promise;
    if (!response.success) {
      userDispatch({
        type: "ADD_TO_PLAYLIST",
        payload: { playlist: playlist, video: video }
      });
    }
  };

  return (
    <div>
      <h2>Playlists {playlist.length}</h2>
      {playlist.map((playlist1) => {
        const { _id, name, videos } = playlist1;
        return (
          <div key={_id}>
            <div className="playlist-row">
              <div>{name}</div>
              <div
                className="delete"
                onClick={() => {
                  removePlaylist(playlist1);
                }}
              >
                <AiFillDelete />
              </div>
            </div>
            <div className="grid">
              {videos?.map((v) => {
                const {
                  _id,
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
                    key={_id}
                    className="card"
                    onClick={() => addHistory(v)}
                  >
                    <div
                      className="close-card"
                      onClick={() => {
                        removeFromPlaylist(playlist1, v);
                      }}
                    >
                      <span>&times;</span>
                    </div>
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
