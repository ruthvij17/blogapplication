import React, { useEffect, useState } from "react";
import { MdLibraryAdd } from "react-icons/md";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import DefaultLayout from "../Layouts/DefaultLayout";

const AddBlogPage = () => {
  const [inputs, setInputs] = useState([]);

  const addInput = (type) => {
    setInputs([...inputs, { type, content: "" }]);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].content = event.target.value; // Update the value of the textbox at the given index
    setInputs(newInputs);
  };

  const handleDelete = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
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
              placeholder="Enter the title of the blog"
              required
              className="border-2 border-white rounded-sm px-2 py-1 text-xl outline-none bg-transparent placeholder:text-[rgba(255,255,255,0.2)]"
            />
            <label htmlFor="Intro">About:</label>
            <textarea
              name="Intro"
              placeholder="Enter the brief description about the blog"
              required
              className="border-2 border-white rounded-sm px-2 py-1 outline-none bg-transparent placeholder:text-[rgba(255,255,255,0.2)]"
            ></textarea>
            <label htmlFor="image">Poster Image:</label>
            <input
              type="url"
              name="image"
              placeholder="Enter the url for the poster image "
              className="border-2 border-white rounded-sm px-2 py-1 outline-none bg-transparent placeholder:text-[rgba(255,255,255,0.2)]"
            />
            <br />
            <hr />
            <br />
            {inputs &&
              inputs.map((input, index) => {
                if (input.type === "desc") {
                  return (
                    <div key={index} className="flex flex-col">
                      <label>Description:</label>
                      <div className="w-full flex justify-between items-center">
                        <textarea
                          required
                          value={input.content}
                          onChange={(e) => handleInputChange(index, e)}
                          className="border-2 w-[95%] border-white rounded-sm px-2 py-1 outline-none bg-transparent"
                        ></textarea>
                        <div
                          className="w-[30px] h-[30px] rounded-sm border border-red-700 flex items-center justify-center active:bg-red-700 cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          X
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="flex flex-col">
                      <label>
                        {input.type === "text" ? "Title:" : "Image URL:"}
                      </label>
                      <div className="w-full flex justify-between items-center">
                        <input
                          required
                          type={input.type}
                          value={input.content}
                          onChange={(e) => handleInputChange(index, e)}
                          className="border-2 w-[95%] border-white rounded-sm px-2 py-1 outline-none bg-transparent"
                        />
                        <div
                          className="w-[30px] h-[30px] rounded-sm border border-red-700 flex items-center justify-center active:bg-red-700 cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          X
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
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
        <div className="border-[rgb(60,60,228)] border-2 sticky right-3 bottom-0 top-0 bg-black flex flex-col p-2 w-[10%] h-[95vh] justify-around rounded-xl">
          <button
            onClick={() => addInput("text")}
            className="cursor-pointer border-2 border-[rgb(60,60,228)] rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
          >
            <MdLibraryAdd /> Add Title
          </button>
          <button
            onClick={() => addInput("url")}
            className="cursor-pointer border-2 border-[rgb(60,60,228)] rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
          >
            <BiSolidImageAdd />
            Add Image
          </button>
          <button
            onClick={() => addInput("desc")}
            className="cursor-pointer border-2 border-[rgb(60,60,228)] rounded-sm active:bg-[rgb(60,60,228)] flex items-center justify-center"
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
