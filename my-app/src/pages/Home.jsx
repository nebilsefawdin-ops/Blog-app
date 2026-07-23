import { useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("https://dummyjson.com/posts?limit=10");

        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }

        const data = await response.json();

        const localPosts = JSON.parse(localStorage.getItem("posts")) || [];

        setPosts([...localPosts, ...data.posts]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <div className="home">
      <h1>
        Discover <strong>Something</strong> New
      </h1>

      <div className="create-name">
        <Link to="/create">
          <button>+ Create a new Post</button>
        </Link>
      </div>

      <div className="blogs-container">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
