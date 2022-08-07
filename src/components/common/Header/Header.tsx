import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="heading">
      <nav className="container">
        <Link className="link" to="/">Sign Message</Link>
        <Link className="link" to="/verify">Verify Message</Link>
      </nav>
    </div>
  );
};

export default Header;
