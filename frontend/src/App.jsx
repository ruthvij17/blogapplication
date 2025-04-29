import { useContext, useEffect } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Router } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SigninPage from "./Pages/SigninPage";
import BlogPage from "./Pages/BlogPage";
import AddBlogPage from "./Pages/AddBlogPage";
import ProfilePage from "./Pages/ProfilePage";
import axios from "axios";
import { UserContext } from "./Context/UserContext";

import AdminHomePage from "./Admin/AdminHomePage";
import AnalyticsPage from "./Admin/AnalyticsPage";
import UserPage from "./Admin/UserPage";

import AccessDeniedPage from "./Pages/AccessDeniedPage";

axios.defaults.baseURL = "https://blogapplication-backend-gi3g.onrender.com";

function App() {
  z;
  // const [loggedInUser, setLoggedInUser] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    try {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    } catch (error) {
      alert("Error parsing JSON:", error);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/signin" element={<SigninPage />}></Route>
      <Route path="/blog/:id" element={<BlogPage />}></Route>
      <Route
        path="/add/blog/:id"
        element={user ? <AddBlogPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/profile/:id"
        element={user ? <ProfilePage /> : <LoginPage />}
      ></Route>
      <Route
        path="/admin/home"
        element={
          user && user.email == "admin@e.com" ? (
            <AdminHomePage />
          ) : (
            <AccessDeniedPage />
          )
        }
      ></Route>
      <Route
        path="/admin/users/details"
        element={
          user && user.email == "admin@e.com" ? (
            <UserPage />
          ) : (
            <AccessDeniedPage />
          )
        }
      ></Route>
      <Route
        path="/admin/analytics/:id"
        element={
          user && user.email == "admin@e.com" ? (
            <AnalyticsPage />
          ) : (
            <AccessDeniedPage />
          )
        }
      ></Route>
    </Routes>
  );
}

export default App;
