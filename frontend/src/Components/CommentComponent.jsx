import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams } from "react-router";
import axios from "axios";

const CommentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState();
  const [input, setInput] = useState();
  const { user, setUser } = useContext(UserContext);

  const uid = user && (user._id ? user._id : JSON.parse(user)._id);
  const { id } = useParams();

  const getComments = async () => {
    try {
      //console.log("HIII");
      const response = await axios.get(`/get/comments/${id}`);
      if (response.data) {
        setComments(response.data.comments);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/post/comment", {
        userId: uid,
        blogId: id,
        commentData: input,
        time: Date.now(),
      });
      if (!response.data) {
        alert("Comment not added");
      }
      getComments();
      setInput("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="m-2 w-[98vw] bg-black text-white rounded-lg p-4">
        <h1 className="font-bold text-2xl mb-2">Comments</h1>
        <form className="bg-white/15 w-1/2 rounded-lg p-2 flex flex-row justify-between">
          <input
            type="text"
            className="w-[85%] outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add comment"
          />
          <input
            className="w-[15%] bg-black rounded-lg cursor-pointer p-2 hover:bg-white/30 active:scale-3d"
            type="submit"
            onClick={(e) => (input == "" ? "" : handleSubmit(e))}
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
          {comments &&
            comments.map((ele) => {
              return (
                <div className="flex flex-row items-center gap-2">
                  <div className="h-10 w-10 text-xl rounded-full border-2 border-gray-300 bg-white/15 flex items-center text-center justify-center uppercase">
                    {ele.commentedUser.name[0]}
                  </div>
                  <div className={`bg-white/15 w-fit rounded-lg p-2 my-2`}>
                    <h1 className="font-semibold font-serif">
                      {ele.commentedUser.name}{" "}
                      <span className="text-[11px] font-extralight font-sans">
                        {new Date(ele.time).toLocaleString()}
                      </span>
                    </h1>
                    <p className="font-light">{ele.commentData}</p>
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
