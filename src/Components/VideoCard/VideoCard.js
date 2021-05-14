import "./VideoCard_module.css";
import "../../styles.css";
import { Link } from "react-router-dom";
import { useVideo } from "../../Context/context";
export default function VideoCard({ video }) {
  const { dispatch } = useVideo();
  const { id, embedId, title, views, channel, age, thumbnailImgUrl } = video;
  return (
    <Link
      to={"/video/" + embedId}
      key={id}
      className="card"
      onClick={() => dispatch({ type: "ADD_TO_HISTORY", payload: video })}
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
            <span style={{ marginLeft: "5px" }}>{views % 1000}k views •</span>
            <span> {age} ago</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
