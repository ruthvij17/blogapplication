import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import PosterSlider from "../Components/PosterSliderComponent";
import { useParams } from "react-router";

const ProfileSlidersComponent = () => {
  const [likedBlogs, setLikedBlogs] = useState();
  const [savedBlogs, setSavedBlogs] = useState();

  const { id } = useParams();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`/get/liked/blogs/${id}`);
        if (response) {
          setLikedBlogs(response.data.likedBlogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`/get/saved/blogs/${id}`);
        if (response) {
          setSavedBlogs(response.data.savedBlogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, []);

  return (
    <>
      <div
        className={`h-[85vh] w-[69%] rounded-lg overflow-auto `}
        id="scrollbar"
      >
        <div className="container px-4 flex flex-col gap-3 bg-black/15 w-full rounded-lg pb-1">
          <div className="flex flex-col items-start sm:ml-3 mt-2">
            <h3 className={`text-2xl font-bold text-black`}>Liked Blogs</h3>
            <p className={`text-sm text-black`}>Blogs that are liked by you</p>
          </div>
          <PosterSlider blogs={likedBlogs} isDark={false} />
        </div>

        <div className="container px-4 flex flex-col gap-3 bg-black w-full mt-1 rounded-lg pb-1">
          <div className="flex flex-col items-start sm:ml-3 mt-2 bg-black">
            <h3 className={`text-2xl font-bold text-white`}>Saved Blogs</h3>
            <p className={`text-sm text-white`}>Blogs that are saved by you</p>
          </div>
          <PosterSlider blogs={savedBlogs} isDark="true" />
        </div>
      </div>
    </>
  );
};

export default ProfileSlidersComponent;
