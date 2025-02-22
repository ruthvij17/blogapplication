import { useState } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SigninPage from "./Pages/SigninPage";
import BlogPage from "./Pages/BlogPage";
import AddBlogPage from "./Pages/AddBlogPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/blog/:id" element={<BlogPage />}></Route>
      <Route
        path="/add/blog"
        element={loggedInUser ? <AddBlogPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/profile"
        element={loggedInUser ? <ProfilePage /> : <LoginPage />}
      ></Route>
    </Routes>
  );
}

export default App;
