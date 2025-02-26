import React from "react";
import { Link } from "react-router-dom";

const Poster = (props) => {
  return (
    <Link to={`/blog/nubb`}>
      <div
        id="scrollbar"
        className={`h-[45vh] flex flex-col items-start gap-2 px-1 py-3 rounded-lg m-2 overflow-auto ${
          props.isDark ? "bg-white/20" : "bg-black/15"
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
            className={`w-full rounded-md h-40 border object-cover ${
              props.isDark ? "border-white" : "border-black"
            }`}
          />

          <h3
            className={`text-lg font-bold ${
              props.isDark ? "text-white" : "text-black"
            }`}
          >
            {props.title}
          </h3>
          <p
            className={`text-[10px] ${
              props.isDark ? "text-white/50" : "text-black/50"
            }`}
          >
            {props.about}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Poster;
