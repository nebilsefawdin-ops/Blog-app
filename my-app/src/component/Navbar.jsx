import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>
        <strong>PostNest</strong>
      </h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/create">Create Post</Link>

        <Link to="/bookmarks">Bookmarks</Link>
      </div>
    </nav>
  );
}

export default Navbar;
