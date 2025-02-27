import React, { useState } from "react";

const CommentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    {
      username: "john_doe",
      comment: "This is a great post! Thanks for sharing.",
      date: "2025-02-27T08:15:00Z",
    },
    {
      username: "jane_smith",
      comment: "I learned a lot from this article. Very insightful.",
      date: "2025-02-26T19:45:00Z",
    },
    {
      username: "alex_martin",
      comment: "I disagree with some points, but overall it's a solid read.",
      date: "2025-02-25T11:30:00Z",
    },
    {
      username: "sarah_lee",
      comment:
        "Interesting perspective! Would love to see more posts like this.",
      date: "2025-02-24T16:20:00Z",
    },
    {
      username: "mike_wilson",
      comment: "Can you explain more about the third point in the article?",
      date: "2025-02-23T21:10:00Z",
    },
  ];

  return (
    <>
      <div className="m-2 w-[98vw] bg-black text-white rounded-lg p-4">
        <h1 className="font-bold text-2xl mb-2">Comments</h1>
        <form className="bg-white/15 w-1/2 rounded-lg p-2 flex flex-row justify-between">
          <input
            type="text"
            className="w-[85%] outline-none"
            placeholder="Add comment"
          />
          <input
            className="w-[15%] bg-black rounded-lg cursor-pointer p-2"
            type="submit"
          />
        </form>
        <h1
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer font-light text-sm my-2 bg-white/15 w-fit p-2 rounded-lg"
        >
          {isOpen ? "Close" : "View"}
        </h1>
        <div className={`${isOpen ? "flex flex-col" : "hidden"}`}>
          <hr />
          {data.map((ele) => {
            return (
              <div className="flex flex-row items-center gap-2">
                <div className="h-10 w-10 text-xl rounded-full border-2 border-gray-300 bg-white/15 flex items-center text-center justify-center uppercase">
                  {ele.username[0]}
                </div>
                <div className={`bg-white/15 w-fit rounded-lg p-2 my-2`}>
                  <h1 className="font-semibold font-serif">
                    {ele.username}{" "}
                    <span className="text-[11px] font-extralight font-sans">
                      {new Date(ele.date).toLocaleString()}
                    </span>
                  </h1>
                  <p className="font-light">{ele.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CommentComponent;
