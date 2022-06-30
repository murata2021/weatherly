import { Link } from "react-router-dom";
import logo from "../assets/weatherly.png";
import Toggle from "./Switch";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-light shadow-sm ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" title="Home">
            <img src={logo} alt="Weatherly" width="60" />
            <span> Weatherly</span>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/my-locations"
                title="Favorite Locations"
              >
                My Favorites
              </Link>
            </li>
            <li className="btn">
              <Toggle />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
