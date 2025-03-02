import { useContext, useEffect } from "react";
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
import axios from "axios";
import { UserContext } from "./Context/UserContext";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  // const [loggedInUser, setLoggedInUser] = useState();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/blog/:id" element={<BlogPage />}></Route>
      <Route
        path="/add/blog"
        element={user ? <AddBlogPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/profile/:id"
        element={user ? <ProfilePage /> : <LoginPage />}
      ></Route>
    </Routes>
  );
}

export default App;
