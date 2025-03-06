import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  return (
    <>
      <div className="search text-2xl text-gray-500 flex flex-row border border-white rounded-full items-center p-3">
        <FaSearch className="p-1" />
        <input
          type="text"
          placeholder="Search blogs by name"
          className="outline-none border-none text-lg text-gray-200"
        />
      </div>
    </>
  );
};

export default SearchComponent;
