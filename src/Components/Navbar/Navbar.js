import "./Navbar_module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="shop-name" to="/">
        HealthTube
      </Link>
    </div>
  );
}
