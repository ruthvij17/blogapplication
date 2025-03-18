import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import SearchDisplayComponent from "./SearchDisplayComponent";

const SearchComponent = () => {
  const [blogs, setBlogs] = useState();
  const [input, setInput] = useState();
  const [isHidden, setIsHidden] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setIsHidden(false);
      try {
        const response = await axios.get(`/search/${input}`);
        if (response.data.results) {
          setBlogs(response.data.results);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  // useEffect(() => {
  //   const getblogs = async () => {
  //     try {
  //       const response = await axios.get(`/search/${input}`);
  //       if (response.data.results) {
  //         setBlogs(response.data.results);
  //       } else {
  //         alert(response.data.message);
  //       }
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   };
  //   getblogs();
  // }, []);

  return (
    <>
      <div className="search text-2xl text-gray-500 flex flex-row border border-white rounded-full items-center py-2 px-3">
        <FaSearch className="p-1" />
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            type="search"
            value={input}
            placeholder="Search blogs by name"
            className="outline-none border-none text-lg text-gray-200"
            // onChange={(e) => setInput(e.target.value)}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
      <SearchDisplayComponent
        blogs={blogs}
        setIsHidden={setIsHidden}
        isHidden={isHidden}
      />
    </>
  );
};

export default SearchComponent;
