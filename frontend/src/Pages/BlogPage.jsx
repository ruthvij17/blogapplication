import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";

const BlogPage = () => {
  const blog = {
    title: "Virat Kohli",
    category: "Sports",
    about: "Harsha is doing something",
    posterImage:
      "https://images.mykhel.com/webp/images/cricket/players/8/3788.jpg",
    data: [
      {
        type: "text",
        content: "hekllo",
      },
      {
        type: "url",
        content: "https://www.example.com/images/image1.jpg",
      },
      {
        type: "desc",
        content: "qefiyfe",
      },
      {
        type: "text",
        content: "weyfifud",
      },
      {
        type: "desc",
        content: "wjfyqfeuq",
      },
    ],
  };
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
            <div className="h-[82vh] max-w-[60vw]">
              <img
                src={blog.posterImage}
                alt="poster movie"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 px-4 my-3">
                <h1 className="text-white font-extrabold text-5xl">
                  {blog.title}
                </h1>
                <div className="text-white flex flex-col gap-2 md:px-4">
                  <h4>{blog.about}</h4>
                  <h4>{blog.category}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={blog.posterImage}
          alt="Movie Backdrop poster"
          className="w-[99%] h-[90vh] object-cover object-center"
        />
      </div>
    </>
  );
};

export default DefaultLayout(BlogPage);
