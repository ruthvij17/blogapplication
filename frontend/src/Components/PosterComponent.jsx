import React from "react";
import { Link } from "react-router-dom";

const Poster = (props) => {
  return (
    <Link to={`/blog/nubb`}>
      <div
        className={`flex flex-col items-start gap-2 border-2 px-1 py-3 rounded-lg m-2 ${
          props.isDark ? "border-white" : "border-black"
        }`}
      >
        <div className="p-2 w-full">
          <img
            src={
              props.posterImage
                ? `${props.posterImage}`
                : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            }
            alt="post"
            className="w-full rounded-md h-40 border border-white"
          />
          <h3
            className={`text-lg font-bold ${
              props.isDark ? "text-white" : "text-gray-700"
            }`}
          >
            {props.title}
          </h3>
          <p className="text-white/50 text-[10px]">{props.about}</p>
        </div>
      </div>
    </Link>
  );
};

export default Poster;
