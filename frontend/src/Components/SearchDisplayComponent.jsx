import React from "react";
import PosterSlider from "./PosterSliderComponent";

const SearchDisplayComponent = ({ blogs, isHidden, setIsHidden }) => {
  return (
    <>
      <div
        className={`bg-gray-500 w-[98vw] left-2 absolute top-[85px] z-10 rounded-lg p-2 ${
          isHidden ? "hidden" : ""
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold p-2">Search Results</h1>
          <p className="font-semibold pl-2">Results based on search</p>
          <PosterSlider blogs={blogs} isDark={true} />
        </div>
        <div
          className="w-[30px] h-[30px] rounded-sm border border-red-700 flex items-center justify-center bg-red-700 cursor-pointer absolute top-2 right-3"
          onClick={() => setIsHidden(true)}
        >
          X
        </div>
      </div>
    </>
  );
};

export default SearchDisplayComponent;
