import "./Toolbar_module.css";
import { RiHistoryFill } from "react-icons/ri";
import { MdWatchLater, MdPlaylistAdd } from "react-icons/md";
import { AiOutlineLike, AiTwotoneHome } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function Toolbar() {
  return (
    <div className="sticky-toolbar">
      <ul>
        <li>
          <Link to="/">
            <AiTwotoneHome />
          </Link>
        </li>

        <li>
          <Link to="/playlist">
            <MdPlaylistAdd />
          </Link>
        </li>
        <li>
          <Link to="/liked">
            <AiOutlineLike />
          </Link>
        </li>
        <li>
          <Link to="/watchlater">
            {" "}
            <MdWatchLater />
          </Link>
        </li>
        <li>
          <Link to="/history">
            <RiHistoryFill />
          </Link>
        </li>
      </ul>
    </div>
  );
}
