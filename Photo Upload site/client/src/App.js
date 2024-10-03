import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom'
import Blogs from "./pages/Blogs"
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs";
import CreateBlogs from "./pages/CreateBlogs";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/user-blog" element={<UserBlogs />} ></Route>
        <Route path="/create" element={<CreateBlogs />} ></Route>
        <Route path="/blog-details/:id" element={<BlogDetails />} ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
