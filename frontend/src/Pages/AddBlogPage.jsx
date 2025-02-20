import React, { useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import DefaultLayout from "../Layouts/DefaultLayout";

const AddBlogPage = () => {
  const [inputs, setInputs] = useState([]);
  const [inputType, setInputType] = useState("text");

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value; // Update the value of the textbox at the given index
    setInputs(newInputs);
  };

  const handleButtonClick = (type) => {
    setInputType(type); // Update input type based on the button clicked
    addInput();
  };
  return (
    <>
      <div className="flex flex-row min-h-screen w-screen items-center justify-between bg-white text-white p-3">
        <div className="p-5 rounded-xl bg-black w-[85%]">
          <form className="flex flex-col gap-2 min-h-[95vh]">
            <h2 class="text-transparent bg-clip-text bg-gradient-to-t uppercase text-shadow-white from-black to-white text-2xl font-semibold text-center">
              add your blog
            </h2>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              required
              className="border-2 border-white rounded-sm px-2 py-1 text-xl outline-none bg-transparent placeholder:text-gray-400"
            />
            <label htmlFor="Intro">About:</label>
            <textarea
              name="Intro"
              required
              className="border-2 border-white rounded-sm px-2 py-1 text-xl outline-none bg-transparent placeholder:text-gray-400"
            ></textarea>
            {inputs &&
              inputs.map((input, index) => (
                <div key={index} className="flex flex-col">
                  <label>Textbox {index + 1}</label>
                  <input
                    type={inputType}
                    value={input}
                    onChange={(e) => handleInputChange(index, e)}
                    className="border-2 border-white rounded-sm px-2 py-1 text-xl outline-none bg-transparent placeholder:text-gray-400"
                  />
                </div>
              ))}
            <center>
              <button
                type="submit"
                className="border-2 border-none rounded-sm px-5 py-3 mt-5 text-xl bg-[rgb(66,63,228)] text-white hover:bg-[rgb(87,86,145)] cursor-pointer active:bg-[rgb(23,22,95)] w-[25%] flex items-center justify-center"
              >
                <BsFillSendFill />
                POST BLOG
              </button>
            </center>
          </form>
        </div>
        <div className="sticky right-3 bottom-0 top-0 bg-black flex flex-col p-2 w-[10%] h-[95vh] justify-around rounded-xl">
          <button
            onClick={() => handleButtonClick("text")}
            className="cursor-pointer border-2 border-white rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
          >
            <MdLibraryAdd /> Add Title
          </button>
          <button
            onClick={() => handleButtonClick("url")}
            className="cursor-pointer border-2 border-white rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
          >
            <BiSolidImageAdd />
            Add Image
          </button>
          <button
            onClick={() => handleButtonClick("text")}
            className="cursor-pointer border-2 border-white rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
          >
            <MdDescription className="text-3xl" />
            Add Description
          </button>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout(AddBlogPage);
