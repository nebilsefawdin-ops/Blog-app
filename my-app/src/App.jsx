import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";

import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreatePost from "./pages/CreatePost";
import Bookmarks from "./pages/Bookmarks";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/blog/:id" element={<BlogDetails />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/bookmarks" element={<Bookmarks />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
