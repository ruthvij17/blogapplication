import React, { useState, useEffect, useContext } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import ProfileSlidersComponent from "../Components/ProfileSlidersComponent";
import {
  FaFacebook,
  FaInstagramSquare,
  FaPinterest,
  FaLinkedin,
  FaYoutubeSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import PosterSlider from "../Components/PosterSliderComponent";
import { UserContext } from "../Context/UserContext";
import EditProfileComponent from "../Components/EditProfileComponent";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  const [profile, setProfile] = useState();
  const [socialLinks, setSocialLinks] = useState();

  const id = user._id || JSON.parse(user)._id;

  const uid = useParams().id;

  const [postedBlogs, setPostedBlogs] = useState();

  const socialMediaLinks = {
    instagram: <FaInstagramSquare />,
    twitter: <FaSquareXTwitter />,
    facebook: <FaFacebook />,
    youtube: <FaYoutubeSquare />,
    linkedin: <FaLinkedin />,
    pinterest: <FaPinterest />,
  };

  useEffect(() => {
    console.log(socialLinks);
  }, [socialLinks]);

  // posted blogs
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`/get/posted/blogs/${uid}`);
        if (response) {
          setPostedBlogs(response.data.postedBlogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, []);

  // get profile details
  const getProfileDetails = async () => {
    try {
      const response = await axios.get(`/get/profile/details/${uid}`);
      if (response.data) {
        setProfile(response.data.profile);
        setSocialLinks(response.data.profile.socialLinks);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    getProfileDetails();
  }, [isOpen]);

  useEffect(() => {
    const follow = async () => {
      try {
        const response = await axios.get(`/get/followed/${id}/${uid}`);
        if (response.data) {
          setIsFollowed(response.data.followed);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    user && follow();
  }, []);

  const handleFollow = () => {
    setIsFollowed(!isFollowed);
    const follow = async () => {
      try {
        const response = await axios.post(`post/follow/user`, {
          followerId: id,
          bloggerId: uid,
          followed: isFollowed,
        });

        if (response.data) {
          //setProfile(response.data.profile);
          getProfileDetails();
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    user && follow();
  };

  return (
    <>
      {isOpen ? (
        <EditProfileComponent setIsOpen={setIsOpen} isOpen={isOpen} />
      ) : (
        ""
      )}
      <div
        className={`w-[98%] flex flex-row justify-center mx-2 gap-2 flex-wrap ${
          isOpen ? "blur-sm" : ""
        }`}
      >
        {id == uid ? <ProfileSlidersComponent /> : ""}
        <div
          className="h-[85vh] w-[30%] bg-black text-white rounded-lg overflow-x-hidden flex flex-col items-center overflow-auto"
          id="scrollbar"
        >
          <div className="w-full h-[25vh] flex flex-col items-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTdgyWhgLt63OybG15IZYn8pRqoPvNiEToPQ&s')] bg-cover">
            {id == uid ? (
              <div className="w-full h-3 relative">
                <FaRegEdit
                  className="absolute top-2 right-2 text-2xl"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            ) : (
              ""
            )}
            <img
              src={
                (profile && profile.profileImage) ||
                "https://verdantfox.com/static/images/avatars_default/av_blank.png"
              }
              alt="image not found"
              className="rounded-full h-[9em] w-[9em] transform translate-y-[12vh] border-4 bg-white border-black"
            />
          </div>
          <div className="mt-[70px] flex flex-col items-center">
            <h1 className="text-3xl font-extrabold text-center">
              {profile && profile.name}
            </h1>
            <p className="EMAIL w-[75%] text-center text-gray-400 text-sm">
              {profile && profile.email}
            </p>
            <p className="BIO w-[75%] text-center text-gray-200 text-sm">
              {profile && profile.bio}
            </p>
            <div
              className={`${
                isFollowed ? "bg-transparent" : "bg-blue-500 "
              } px-3 w-25 py-1 rounded-lg my-1 cursor-pointer border-3 border-blue-500 text-center`}
              onClick={() => handleFollow()}
            >
              {isFollowed ? "Following" : "Follow"}
            </div>
            <div className="flex flex-row gap-3 mt-2 items-center justify-center">
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">{profile && profile.blogs}</p>
                <p className="text-xs">Blogs</p>
              </div>
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">
                  {profile && profile.followers.length}
                </p>
                <p className="text-xs">Followers</p>
              </div>
              <div className="flex flex-col items-center border-1 w-23 border-gray-400 px-4 py-1 rounded-lg">
                <p className="font-bold">
                  {profile && profile.following.length}
                </p>
                <p className="text-xs">Following</p>
              </div>
            </div>
            <div className="flex justify-center text-gray-500 text-3xl lg:text-5xl my-6 gap-4">
              {socialLinks &&
                socialLinks.map(
                  (item, idx) =>
                    item.url && (
                      <Link key={idx} to={item.url}>
                        <div className="h-10 w-10 lg:h-8 lg:w-8 rounded-full overflow-hidden flex justify-center items-center hover:text-white">
                          {socialMediaLinks[item.socialName]}
                        </div>
                      </Link>
                    )
                )}
            </div>
          </div>
        </div>
      </div>

      <div className={`w-[98%] mx-2 mt-1 ${isOpen ? "blur-sm" : ""}`}>
        <div className="container px-4 flex flex-col gap-3 bg-black/15 w-full rounded-lg pb-1">
          <div className="flex flex-col items-start sm:ml-3 mt-2">
            <h3 className={`text-2xl font-bold text-black`}>Posted Blogs</h3>
            <p className={`text-sm text-black`}>Blogs that are posted by you</p>
          </div>
          <PosterSlider blogs={postedBlogs} isDark={false} />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout(ProfilePage);
