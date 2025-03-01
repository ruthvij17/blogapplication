import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Poster from "../Components/PosterComponent";
import PosterSlider from "../Components/PosterSliderComponent";
import HeroCarousel from "../Components/HeroCarouselComponent";
import { UserContext } from "../Context/UserContext";
import axios from "axios";

const HomePage = () => {
  const [category, setCategory] = useState("All");
  const [trendingBlogs, setTrendingBlogs] = useState();
  const [suggestedBlogs, setSuggestedBlogs] = useState();
  const [categoryBlogs, setCategoryBlogs] = useState();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    try {
      const parsedData = JSON.parse(userData);
      setUser(parsedData);
    } catch (error) {
      alert("Error parsing JSON:", error);
    }
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("/get/trending/blogs");
        if (response) {
          setTrendingBlogs(response.data.blogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("/get/suggested/blogs");
        if (response) {
          setSuggestedBlogs(response.data.blogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    // console.log(category);
    const getBlogs = async () => {
      try {
        const response = await axios.get(
          `/get/${
            category == "All" ? "suggested" : category.toLowerCase()
          }/blogs`
        );
        if (response) {
          setCategoryBlogs(response.data.blogs);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getBlogs();
  }, [category]);

  const categories = [
    "All",
    "Sports",
    "Food",
    "Lifestyle",
    "Health",
    "Fashion",
    "Technology",
    "Others",
  ];

  return (
    <>
      <HeroCarousel />

      <div className="flex w-[98%] justify-center p-4 bg-black mx-2 rounded-lg ">
        <div className="w-full max-w-md">
          <TabGroup>
            <TabList className="flex items-center justify-center gap-4">
              {categories.map((ele) => (
                <Tab
                  key={ele}
                  className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/35 data-[hover]:bg-white/15 data-[selected]:data-[hover]:bg-white/25 data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={() => setCategory(ele)}
                >
                  {ele}
                </Tab>
              ))}
            </TabList>
          </TabGroup>
        </div>
      </div>

      <div className="container px-4 flex flex-col gap-3 bg-black/15 w-[98%] m-2 rounded-lg mt-1 pb-1">
        <div className="flex flex-col items-start sm:ml-3 mt-2">
          <h3 className={`text-2xl font-bold text-black`}>{category}</h3>
          <p className={`text-sm text-black`}>Based on selected category</p>
        </div>
        <PosterSlider blogs={categoryBlogs} isDark={false} />
      </div>

      <div className="container px-4 flex flex-col gap-3 bg-black w-[98%] mx-2 rounded-lg pb-1">
        <div className="flex flex-col items-start sm:ml-3 mt-2 bg-black">
          <h3 className={`text-2xl font-bold text-white`}>Trending</h3>
          <p className={`text-sm text-white`}>Most popular</p>
        </div>
        <PosterSlider blogs={trendingBlogs} isDark="true" />
      </div>

      <div className="container px-4 flex flex-col gap-3 bg-black/15 w-[98%] mx-2 rounded-lg mt-2 pb-1">
        <div className="flex flex-col items-start sm:ml-3 mt-2">
          <h3 className={`text-2xl font-bold text-black`}>Suggested</h3>
          <p className={`text-sm text-black`}>Suggested for you</p>
        </div>
        <PosterSlider blogs={suggestedBlogs} isDark={false} />
      </div>
    </>
  );
};

export default DefaultLayout(HomePage);
