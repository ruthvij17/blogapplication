import React from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const Poster = (props) => {
  return (
    <Link to={`/blog/${props._id}`}>
      <div
        id="scrollbar"
        className={`h-[45vh] flex flex-col items-start gap-2 shrink-1 px-1 py-3 rounded-lg m-2 overflow-auto ${
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
            className={`w-full rounded-md h-[25vh] border object-cover ${
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
          <div
            className={`flex gap-3  ${
              props.isDark ? "text-white/50" : "text-black/50"
            } text-sm`}
          >
            <p className="flex items-center gap-1">
              <FaEye />
              {props.views ? Math.ceil(props.views) : 0}
            </p>
            <p className="flex items-center gap-1">
              <BiSolidLike />
              {props.likes ? Math.ceil(props.likes) : 0}
            </p>
          </div>
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
