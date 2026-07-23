import { useAtom } from "jotai";
import { bookmarkAtoms } from "../atoms/bookmarkAtoms";
import { Link } from "react-router-dom";

import BlogCard from "../component/BlogCard";

function Bookmarks() {
  const [bookmarks] = useAtom(bookmarkAtoms);

  return (
    <div>
      <h1> Your Bookmarks</h1>
      <Link to="/">
        <button className="back-button">← Back to Home</button>
      </Link>

      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        bookmarks.map((post) => <BlogCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default Bookmarks;
