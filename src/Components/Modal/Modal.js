import { useVideo } from "../../Context/data/dataContext";
import { useUser } from "../../Context/user/userContext";
import "./Modal_module.css";
import { useState } from "react";
import { playlistAdd, playlistVideoAdd } from "../../Services/user.service";
import { AiOutlineConsoleSql } from "react-icons/ai";
export default function Modal({ video }) {
  const [playlistName, updateplaylistName] = useState("");
  function inputHandler(e) {
    const input = e.target.value;
    updateplaylistName(input);
  }
  const {
    userState: { playlist },
    userDispatch
  } = useUser();
  const { ModalChange } = useVideo();
  let { _id } = video;

  const addPlaylist = async (name) => {
    let promise = playlistAdd(name);
    let response = await promise;
    if (response.success) {
      userDispatch({
        type: "CREATE_PLAYLIST",
        payload: {
          playlistId: response.playlist._id,
          playlistName: response.playlist.name
        }
      });
    }
    if (!response.success) {
      userDispatch({ type: "REMOVE_PLAYLIST", payload: name });
    }
  };

  const addToPlaylist = async (playlist, video) => {
    let promise = playlistVideoAdd(playlist._id, video._id);
    userDispatch({
      type: "ADD_TO_PLAYLIST",
      payload: { playlist: playlist, video: video }
    });
    let response = await promise;
    console.log(response);
    if (!response.success) {
      userDispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { playlist: playlist, video: video }
      });
    }
  };

  return (
    <div className="modal-app" key={_id}>
      <div className="modal">
        <div className="modal-content">
          <div className="flex-row-playlist">
            <div>Playlists</div>
            <div className="close" onClick={ModalChange}>
              &times;
            </div>
          </div>
          <div>
            {playlist.map((playlist) => {
              return (
                <div className="playlist-checker">
                  <button
                    style={{ marginRight: "0.5rem" }}
                    className="primary-btn"
                    onClick={() => {
                      addToPlaylist(playlist, video);
                    }}
                  >
                    Add
                  </button>
                  <label>{playlist.name}</label>
                </div>
              );
            })}
          </div>
          <input placeholder="Playlist name" onChange={inputHandler} />
          <button
            className="primary-btn"
            onClick={() => {
              addPlaylist(playlistName);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
