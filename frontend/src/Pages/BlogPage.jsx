import React, { useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import CommentComponent from "../Components/CommentComponent";
import { useParams } from "react-router";
import axios from "axios";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
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
              <div className="h-[82vh] max-w-[60vw] min-w-fit">
                <img
                  src={blog.posterImage}
                  alt="poster movie"
                  className="w-full h-full rounded-lg"
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
        <CommentComponent />
      </>
    );
  } else {
    return <></>;
  }
};

export default DefaultLayout(BlogPage);
