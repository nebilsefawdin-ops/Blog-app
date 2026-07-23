import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { bookmarkAtoms } from "../atoms/bookmarkAtoms";
import { IoIosArrowRoundForward } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

function BlogCard({ post }) {
  const [bookmarks, setBookmarks] = useAtom(bookmarkAtoms);

  const isBookmarked = bookmarks.some((item) => item.id === post.id);

  function toggleBookmark() {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter((item) => item.id !== post.id));
    } else {
      setBookmarks([...bookmarks, post]);
    }
  }

  return (
    <div className="blog-card">
      <Link to={`/blog/${post.id}`}>
        {post.tags && (
          <div className="tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
      <h2>{post.title}</h2>
      <p>{post.body.substring(0, 100)}...</p>
      <button onClick={toggleBookmark}>
        {isBookmarked ? (
          <FaBookmark className="bookmark-icon" />
        ) : (
          <CiBookmark className="bookmark-icon" />
        )}
      </button>
      <br />
      <br />
      <Link to={`/blog/${post.id}`}>Read More →</Link>
    </div>
  );
}

export default BlogCard;
