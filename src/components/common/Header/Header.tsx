import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="heading">
      <nav className="container">
        <Link  className={`link ${location.pathname.toString() === "/" && "active"}`} to="/">
          Sign Message
        </Link>
        <Link className={`link ${location.pathname.toString() === "/verify" && "active"}`} to="/verify">
          Verify Message
        </Link>
      </nav>
    </div>
  );
};

export default Header;
