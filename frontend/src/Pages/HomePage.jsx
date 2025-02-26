import React, { useEffect, useState } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Poster from "../Components/PosterComponent";
import PosterSlider from "../Components/PosterSliderComponent";
import HeroCarousel from "../Components/HeroCarouselComponent";

const HomePage = () => {
  const [category, setCategory] = useState("All");
  useEffect(() => {
    console.log(category);
  }, [category]);
  const categories = [
    "All",
    "Sports",
    "Food",
    "Lifestyle",
    "Health",
    "Fashion",
    "Technology",
  ];

  const blogs = [
    {
      title: "Something",
      category: "Sports",
      about: "Harsha is doing something",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
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
    },
    {
      title: "Delicious Dishes",
      category: "Food",
      about: "Explore some mouthwatering recipes",
      posterImage:
        "https://documents.bcci.tv/resizedimageskirti/164_compress.png",
      data: [
        {
          type: "text",
          content: "Tasty meals",
        },
        {
          type: "url",
          content: "https://www.example.com/images/foodimage1.jpg",
        },
        {
          type: "desc",
          content: "Rich flavors",
        },
        {
          type: "text",
          content: "Fresh ingredients",
        },
        {
          type: "desc",
          content: "Perfect for family gatherings",
        },
      ],
    },
    {
      title: "Healthy Living",
      category: "Health",
      about: "Tips for living a healthier life",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG276J99WMZdlsHfn17ZukWcAHXgSATWaU_Q&s",
      data: [
        {
          type: "text",
          content: "Stay fit",
        },
        {
          type: "url",
          content: "https://www.example.com/images/healthimage1.jpg",
        },
        {
          type: "desc",
          content: "Mental and physical well-being",
        },
        {
          type: "text",
          content: "Eat balanced meals",
        },
        {
          type: "desc",
          content: "Incorporate exercise into your routine",
        },
      ],
    },
    {
      title: "Fashion Trends 2025",
      category: "Fashion",
      about: "The latest in fashion trends",
      posterImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBBiseRaDGxoJu6Ytd7ndyPA97S3kbkJLpnA&s",
      data: [
        {
          type: "text",
          content: "Latest fashion",
        },
        {
          type: "url",
          content: "https://www.example.com/images/fashionimage1.jpg",
        },
        {
          type: "desc",
          content: "Trendy outfits for the season",
        },
        {
          type: "text",
          content: "Street style",
        },
        {
          type: "desc",
          content: "Dress to impress",
        },
      ],
    },
    {
      title: "Tech Innovations",
      category: "Technology",
      about: "Breaking new boundaries in tech",
      data: [
        {
          type: "text",
          content: "Cutting-edge tech",
        },
        {
          type: "url",
          content: "https://www.example.com/images/techimage1.jpg",
        },
        {
          type: "desc",
          content: "Future of gadgets",
        },
        {
          type: "text",
          content: "AI revolution",
        },
        {
          type: "desc",
          content: "Smart homes",
        },
      ],
    },
    {
      title: "City Life",
      category: "Lifestyle",
      about: "Embracing the city lifestyle",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
      data: [
        {
          type: "text",
          content: "Urban living",
        },
        {
          type: "url",
          content: "https://www.example.com/images/lifestyleimage1.jpg",
        },
        {
          type: "desc",
          content: "Vibrant communities",
        },
        {
          type: "text",
          content: "Modern living",
        },
        {
          type: "desc",
          content: "City culture",
        },
      ],
    },
    {
      title: "Amazing Game",
      category: "Sports",
      about: "The game of a lifetime",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
      data: [
        {
          type: "text",
          content: "Great match",
        },
        {
          type: "url",
          content: "https://www.example.com/images/image2.jpg",
        },
        {
          type: "desc",
          content: "Thrilling finish",
        },
        {
          type: "text",
          content: "Unbelievable shots",
        },
        {
          type: "desc",
          content: "Incredible teamwork",
        },
      ],
    },
    {
      title: "Delicious Desserts",
      category: "Food",
      about: "Indulge in these sweet treats",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
      data: [
        {
          type: "text",
          content: "Sweet indulgence",
        },
        {
          type: "url",
          content: "https://www.example.com/images/foodimage2.jpg",
        },
        {
          type: "desc",
          content: "Perfect for dessert lovers",
        },
        {
          type: "text",
          content: "Delicious cakes",
        },
        {
          type: "desc",
          content: "A taste of sweetness",
        },
      ],
    },
    {
      title: "Fitness Tips",
      category: "Health",
      about: "Quick tips for staying fit",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
      data: [
        {
          type: "text",
          content: "Workouts",
        },
        {
          type: "url",
          content: "https://www.example.com/images/healthimage2.jpg",
        },
        {
          type: "desc",
          content: "Stay active",
        },
        {
          type: "text",
          content: "Exercise at home",
        },
        {
          type: "desc",
          content: "Boost your metabolism",
        },
      ],
    },
    {
      title: "Glamour Fashion",
      category: "Fashion",
      about: "Shining the spotlight on fashion icons",
      posterImage: "https://www.w3schools.com/w3images/lights.jpg",
      data: [
        {
          type: "text",
          content: "Stylish and glamorous",
        },
        {
          type: "url",
          content: "https://www.example.com/images/fashionimage2.jpg",
        },
        {
          type: "desc",
          content: "Runway looks",
        },
        {
          type: "text",
          content: "Iconic outfits",
        },
        {
          type: "desc",
          content: "Red carpet fashion",
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex w-[98%] justify-center p-4 bg-black mx-2 rounded-lg">
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

      <HeroCarousel />

      <div className="container px-4 flex flex-col gap-3 bg-black w-[98%] mx-2 rounded-lg pb-1">
        <div className="flex flex-col items-start sm:ml-3 mt-2 bg-black">
          <h3 className={`text-2xl font-bold text-white`}>Trending</h3>
          <p className={`text-sm text-white`}>Most popular</p>
        </div>
        <PosterSlider blogs={blogs} isDark="true" />
      </div>

      <div className="container px-4 flex flex-col gap-3 bg-black/15 w-[98%] mx-2 rounded-lg mt-2 pb-1">
        <div className="flex flex-col items-start sm:ml-3 mt-2">
          <h3 className={`text-2xl font-bold text-black`}>Suggested</h3>
          <p className={`text-sm text-black`}>Suggested for you</p>
        </div>
        <PosterSlider blogs={blogs} isDark={false} />
      </div>
    </>
  );
};

export default DefaultLayout(HomePage);
