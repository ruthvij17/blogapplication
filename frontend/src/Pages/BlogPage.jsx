import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import CommentComponent from "../Components/CommentComponent";
import { useParams } from "react-router";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { BiSolidLike, BiLike } from "react-icons/bi";
import { UserContext } from "../Context/UserContext";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [liked, setLiked] = useState();
  const { user, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   const likeBlog = async () => {
  //     try {
  //       const userId = user._id ? user._id : JSON.parse(user)._id;
  //       const response = await axios.post(`/like/blog/${id}`, {
  //         userId,
  //         liked,
  //       });

  //       if (response.data) {
  //         setBlog(response.data.blog);
  //       } else {
  //         alert("Something went wrong");
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   user && likeBlog();
  // }, [liked]);

  const handleLike = () => {
    const likeBlog = async () => {
      try {
        const userId = user._id ? user._id : JSON.parse(user)._id;
        const response = await axios.post(`/like/blog/${id}`, {
          userId,
          liked,
        });

        if (response.data) {
          setBlog(response.data.blog);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    user && likeBlog();
  };

  useEffect(() => {
    const likeBlog = async () => {
      try {
        const userId = user._id ? user._id : JSON.parse(user)._id;
        const response = await axios.get(`/liked/${userId}/${id}`);
        if (response.data) {
          setLiked(response.data.liked);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    user && likeBlog();
  }, []);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`/get/blog/${id}`);
        if (response.data) {
          setBlog(response.data.blog);
        } else {
          alert("Blog not found");
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlog();
  }, []);

  if (blog) {
    return (
      <>
        <div className="px-2">
          <div
            className="absolute z-10 w-[98%] h-[90vh] overflow-hidden rounded-lg"
            style={{
              backgroundImage:
                "linear-gradient(90deg,rgb(34,34,34)24.95%,rgb(34,34,34)38.8% , rgba(34,34,34,0.04)97.47%, rgba(34,34,34,0)100%)",
            }}
          >
            <div className="absolute z-30 left-10 top-5 flex items-center gap-10">
              <div className="h-[82vh] min-w-fit">
                <img
                  src={blog.posterImage}
                  alt="poster movie"
                  className="w-full h-full rounded-lg max-w-[70vw]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div
                  id="scrollbar"
                  className="text-white max-h-[70vh] flex flex-col gap-2 md:px-4 overflow-auto"
                >
                  <h1 className="text-white font-extrabold text-5xl uppercase">
                    {blog.title}
                  </h1>
                  <div className={`flex gap-3`}>
                    <p className="flex items-center gap-1">
                      <FaEye />
                      {blog.views ? Math.ceil(blog.views) : 0}
                    </p>
                    <p className="flex items-center gap-1">
                      <BiSolidLike />
                      {blog.likes ? Math.ceil(blog.likes) : 0}
                    </p>
                  </div>
                  <h4>{blog.about}</h4>
                </div>
              </div>
            </div>
          </div>
          <img
            src={blog.posterImage}
            alt="Movie Backdrop poster"
            className="w-[99%] h-[90vh] object-cover object-center rounded-lg"
          />
        </div>

        <div className="m-2 font-serif">
          {blog.data.map((ele) => {
            if (ele.type == "text") {
              return (
                <div className="">
                  <h1 className="font-bold text-3xl underline">
                    {ele.content}
                  </h1>
                </div>
              );
            } else if (ele.type == "url") {
              return (
                <div className="h-[60vh] overflow-hidden flex justify-center mb-2">
                  <img
                    src={ele.content}
                    alt="invalid url"
                    className="h-full rounded-lg"
                  />
                </div>
              );
            } else if (ele.type == "desc") {
              return (
                <>
                  <p className="indent-8">{ele.content}</p>
                  <br />
                </>
              );
            }
          })}
        </div>

        <div
          className={`flex flex-col text-2xl gap-2 bg-black rounded-lg w-[98%] text-white mx-2 p-2`}
        >
          <p className="flex items-center gap-1 w-fit">
            <FaEye />
            {blog.views ? Math.ceil(blog.views) : 0}
          </p>
          <p
            className="flex items-center gap-1 w-fit cursor-pointer"
            onClick={() => {
              setLiked(!liked);
              handleLike();
            }}
          >
            {liked ? <BiSolidLike /> : <BiLike />}
            {blog.likes ? Math.ceil(blog.likes) : 0}
          </p>
        </div>
        <CommentComponent />
      </>
    );
  } else {
    return <></>;
  }
};

export default DefaultLayout(BlogPage);
