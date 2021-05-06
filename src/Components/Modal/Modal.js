import { useVideo } from "../../Context/context";
import "./Modal_module.css";
import { useState } from "react";

export default function Modal({ video }) {
  const [playlistName, updateplaylistName] = useState("");
  function inputHandler(e) {
    const input = e.target.value;
    updateplaylistName(input);
  }
  const {
    state: { playlists },
    ModalChange,
    dispatch
  } = useVideo();
  const { id } = video;
  return (
    <div className="modal-app" key={id}>
      <div className="modal">
        <div className="modal-content">
          <div className="flex-row-playlist">
            <div>Playlists</div>
            <div className="close" onClick={ModalChange}>
              &times;
            </div>
          </div>
          <div>
            {playlists.map((playlist) => {
              return (
                <div className="playlist-checker">
                  {console.log(video)}
                  <button
                    style={{ marginRight: "0.5rem" }}
                    className="primary-btn"
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_PLAYLIST",
                        payload: { playlist: playlist, video: video }
                      });
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
              dispatch({
                type: "CREATE_PLAYLIST",
                payload: playlistName
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
