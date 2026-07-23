import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogForm from "../component/BlogForm";
import { Link } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function createPost(post) {
    try {
      setError("");
      setMessage("");

      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog.");
      }

      const newPost = await response.json();

      newPost.id = Date.now();
      newPost.isLocal = true;

      const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

      savedPosts.unshift(newPost);

      localStorage.setItem("posts", JSON.stringify(savedPosts));

      setMessage("Blog created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="create-page">
      <Link to="/">
        <button className="back-button">← Back to Home</button>
      </Link>
      <h1>Create Post</h1>
      <h3>Share your thoughts and ideas with the community</h3>
      {message && <p className="success-message">{message}</p>}

      {error && <p className="error-message">{error}</p>}

      <BlogForm onSubmit={createPost} />
    </div>
  );
}

export default CreatePost;
