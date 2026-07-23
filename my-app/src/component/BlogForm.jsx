import { useState } from "react";

function BlogForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required.";
    }

    if (body.trim() === "") {
      newErrors.body = "Content is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      title,
      body,
      userId: 1,
    });

    setTitle("");
    setBody("");
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter an engaging title..."
        value={title}
        className={errors.title ? "input-error" : ""}
        onChange={(e) => {
          setTitle(e.target.value);

          if (errors.title) {
            setErrors({ ...errors, title: "" });
          }
        }}
      />

      {errors.title && <p className="error-message">{errors.title}</p>}

      <textarea
        placeholder="Write your blog content here..."
        value={body}
        className={errors.body ? "input-error" : ""}
        onChange={(e) => {
          setBody(e.target.value);

          if (errors.body) {
            setErrors({ ...errors, body: "" });
          }
        }}
      />

      {errors.body && <p className="error-message">{errors.body}</p>}

      <button type="submit">Publish Post</button>
    </form>
  );
}

export default BlogForm;
