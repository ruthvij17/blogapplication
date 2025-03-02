import React, { useState, useEffect } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterest,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useParams } from "react-router";
import PosterSlider from "../Components/PosterSliderComponent";

const ProfilePage = () => {
  const [likedBlogs, setLikedBlogs] = useState();
  const [savedBlogs, setSavedBlogs] = useState();
  const socialMediaLinks = {
    social_media: [
      {
        name: "Facebook",
        link: "https://www.facebook.com",
      },
      {
        name: "Twitter",
        link: "https://www.twitter.com",
      },
      {
        name: "Instagram",
        link: "https://www.instagram.com",
      },
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com",
      },
      {
        name: "TikTok",
        link: "https://www.tiktok.com",
      },
      {
        name: "Snapchat",
        link: "https://www.snapchat.com",
      },
      {
        name: "YouTube",
        link: "https://www.youtube.com",
      },
      {
        name: "Pinterest",
        link: "https://www.pinterest.com",
      },
      {
        name: "Reddit",
        link: "https://www.reddit.com",
      },
      {
        name: "WhatsApp",
        link: "https://www.whatsapp.com",
      },
      {
        name: "Discord",
        link: "https://www.discord.com",
      },
      {
        name: "Tumblr",
        link: "https://www.tumblr.com",
      },
      {
        name: "Vimeo",
        link: "https://www.vimeo.com",
      },
      {
        name: "Skype",
        link: "https://www.skype.com",
      },
    ],
  };

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
      <div className="w-[98%] flex flex-row mx-2 gap-2">
        <div
          className="h-[85vh] w-[70%] rounded-lg overflow-auto"
          id="scrollbar"
        >
          <div className="container px-4 flex flex-col gap-3 bg-black/15 w-full rounded-lg pb-1">
            <div className="flex flex-col items-start sm:ml-3 mt-2">
              <h3 className={`text-2xl font-bold text-black`}>Liked Blogs</h3>
              <p className={`text-sm text-black`}>
                Blogs that are liked by you
              </p>
            </div>
            <PosterSlider blogs={likedBlogs} isDark={false} />
          </div>

          <div className="container px-4 flex flex-col gap-3 bg-black w-full mt-1 rounded-lg pb-1">
            <div className="flex flex-col items-start sm:ml-3 mt-2 bg-black">
              <h3 className={`text-2xl font-bold text-white`}>Saved Blogs</h3>
              <p className={`text-sm text-white`}>
                Blogs that are saved by you
              </p>
            </div>
            <PosterSlider blogs={savedBlogs} isDark="true" />
          </div>
        </div>
        <div
          className="h-[85vh] w-[30%] bg-black text-white rounded-lg overflow-x-hidden flex flex-col items-center overflow-auto"
          id="scrollbar"
        >
          <div className="w-full h-[25vh] flex flex-col items-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdgyWhgLt63OybG15IZYn8pRqoPvNiEToPQ&s')] bg-cover">
            <div className="w-full h-3 relative">
              <FaRegEdit className="absolute top-2 right-2 text-2xl" />
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT69XWrYQShR6-32LcesotKMgKG3FLvh7Ap3Q&s"
              alt=""
              className="rounded-full h-[9em] w-[9em] transform translate-y-[12vh] border-4 border-black"
            />
          </div>
          <div className="mt-[70px] flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-center">
              Ruthvij R Chandan
            </h1>
            <p className="EMAIL w-[75%] text-center text-gray-400 text-sm">
              ruthvijrchandan2004@gmail.com
            </p>
            <p className="BIO w-[75%] text-center text-gray-200 text-sm">
              Bca @Bck Kundapura koteshwara saligrama hubli bengaluru mangaluru
              dubai chennai
            </p>
            <div className="bg-blue-500 px-2 py-1 rounded-lg my-1">Follow</div>
            <div className="flex flex-row gap-3 mt-2 items-center justify-center">
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">100</p>
                <p className="text-xs">Blogs</p>
              </div>
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">100</p>
                <p className="text-xs">Followers</p>
              </div>
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">100</p>
                <p className="text-xs">Following</p>
              </div>
            </div>
            <div className="flex justify-center text-gray-500 text-3xl lg:text-5xl my-6 gap-4">
              {[
                FaFacebook,
                FaSquareXTwitter,
                FaInstagramSquare,
                FaYoutubeSquare,
                FaPinterest,
                FaLinkedin,
              ].map((Icon, idx) => (
                <div
                  key={idx}
                  className="h-10 w-10 lg:h-8 lg:w-8 rounded-full overflow-hidden flex justify-center items-center hover:text-white"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout(ProfilePage);
