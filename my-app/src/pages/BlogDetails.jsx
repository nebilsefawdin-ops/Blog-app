import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

        const localPost = savedPosts.find(
          (post) => post.id === Number(id) && post.isLocal,
        );

        if (localPost) {
          setPost(localPost);
          setComments([]);
          return;
        }

        const postResponse = await fetch(`https://dummyjson.com/posts/${id}`);

        if (!postResponse.ok) {
          throw new Error("Post not found.");
        }

        const postData = await postResponse.json();
        setPost(postData);

        const commentsResponse = await fetch(
          `https://dummyjson.com/posts/${id}/comments`,
        );

        if (!commentsResponse.ok) {
          setComments([]);
        } else {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.comments || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (error) {
    return <h2 className="error">{error}</h2>;
  }

  return (
    <>
      <Link to="/">
        <button className="Details-back-button">← Back to Home</button>
      </Link>
      <div className="details-page">
        <h1>{post.title}</h1>

        <p>{post.body}</p>

        <h2>Comments({comments.length})</h2>

        {comments.length === 0 ? (
          <p>No comments.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <h4>@{comment.user.username}</h4>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default BlogDetails;
