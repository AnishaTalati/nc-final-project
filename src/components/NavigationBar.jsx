import { Link } from "react-router-dom";
import { showMenu } from "../utils/showMenu";

const NavBar = () => {
  return (
    <div className="navbar" id="navbar">
      <span className="toggle-button" onClick={showMenu}>
        ☰
      </span>

      <ul>
        <li>
          <Link to="/nc-final-project" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/nc-final-project/maps" style={{ textDecoration: "none" }}>
            Maps
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }}>About</Link>
        </li>
        <li>
          <Link style={{ textDecoration: "none" }}>Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
