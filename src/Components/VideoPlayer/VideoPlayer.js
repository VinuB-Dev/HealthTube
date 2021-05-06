import "./VideoPlayer_module.css";
import ReactPlayer from "react-player";
import { MdPlaylistAdd } from "react-icons/md";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";
import { BsFillClockFill, BsClock } from "react-icons/bs";
import Modal from "../Modal/Modal";
import { useParams } from "react-router-dom";
import { videos } from "../../data/faker";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/context";

const ShowItem = () => {
  const {
    state: { watchlater, liked },
    dispatch,
    ModalChange
  } = useVideo();
  const embedId = useParams();
  const video = videos.find(
    (video) => video.embedId === Object.values(embedId)[0]
  );
  const { id, title, views, age, channel, description } = video;
  return (
    <div className="player">
      <ReactPlayer
        url={
          "https://www.youtube.com/embed/" +
          Object.values(embedId)[0] +
          "?autoplay=1"
        }
        className="react-player"
        playing={true}
        controls
        volume={1}
        width="100%"
      />
      <div className="flex-row1">
        <div>
          <div className="pad1">{title}</div>
          <div className="silver pad1 line">
            <span>{Math.floor(views / 1000)}k views •</span>
            <span> {age} ago</span>
          </div>
        </div>
        <div className="flex-row1">
          {liked.some((v) => v.id === id) ? (
            <div
              className="pad2"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: video });
              }}
            >
              <RiThumbUpFill />
            </div>
          ) : (
            <div
              className="pad2"
              onClick={() => {
                dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: video });
              }}
            >
              <RiThumbUpLine />
            </div>
          )}
          {watchlater.some((v) => v.id === id) ? (
            <div
              className="pad2"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: video });
              }}
            >
              <BsFillClockFill />
            </div>
          ) : (
            <div
              className="pad2"
              onClick={() => {
                dispatch({ type: "ADD_TO_WATCHLATER", payload: video });
              }}
            >
              <BsClock />
            </div>
          )}
          <div className="pad2" onClick={ModalChange}>
            <MdPlaylistAdd />
          </div>
        </div>
      </div>
      <div className="flex-row3">
        <div className="logo">
          <img src={channel.logo} alt="" />
        </div>
        <div>
          <div className="pad1">{channel.title}</div>
          <div className="pad1 silver">
            {Math.floor(parseInt(channel.subscribers, 10) / 1000)}k subscribers
          </div>
          <div className="pad1">{description}</div>
        </div>
      </div>
    </div>
  );
};

const ShowVideoCards = () => {
  const { dispatch } = useVideo();
  const embedId = useParams();
  const filteredVideos = videos.filter(
    (video) => video.embedId !== Object.values(embedId)[0]
  );
  return filteredVideos.map((video) => {
    return (
      <Link
        to={"/video/" + video.embedId}
        key={video.id}
        className="card1"
        onClick={() => dispatch({ type: "ADD_TO_HISTORY", payload: video })}
      >
        <div className="thumbnail-img">
          <img src={video.thumbnailImgUrl} alt="" />
        </div>
        <div className="content">
          <div className="pad1">{video.title}</div>
          <div className="flex-row2">
            <div className="logo1">
              <img src={video.channel.logo} alt="" />
            </div>
            <div>
              <div className="pad1 silver">{video.channel.title}</div>
              <div className="silver">
                <span style={{ marginLeft: "5px" }}>
                  {video.views % 1000}k views •
                </span>
                <span> {video.age} ago</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });
};

export default function VideoPlayer() {
  const { modal } = useVideo();
  const embedId = useParams();
  const video = videos.find(
    (video) => video.embedId === Object.values(embedId)[0]
  );
  return (
    <div>
      <div className="making-grids" style={{ display: modal ? "none" : "" }}>
        <div className="allItems">
          <ShowItem />
        </div>
        <div className="allItems">
          <ShowVideoCards />
        </div>
      </div>
      <div
        className="modal-class"
        style={{ display: modal ? "block" : "none" }}
      >
        <Modal video={video} />
      </div>
    </div>
  );
}
