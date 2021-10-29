import "./Navbar_module.css";
import { Link } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { useUser } from "../../Context/user/userContext";

export default function Navbar() {
  const {
    userState: { isLoggedIn },
    userDispatch
  } = useUser();
  return (
    <div className="navbar">
      <Link className="shop-name" to="/">
        HealthTube
      </Link>
      <ul className="right-nav">
        <li>
          {isLoggedIn ? (
            <Link to="/">
              <span
                onClick={() => {
                  userDispatch({
                    type: "UPDATE_USER_LOGIN",
                    payload: {
                      isLoggedIn: false
                    }
                  });
                }}
              >
                Logout
              </span>
            </Link>
          ) : (
            <Link to="/login">
              <span>
                <RiLoginBoxFill />
                Login
              </span>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}
