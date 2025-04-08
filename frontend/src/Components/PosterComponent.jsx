import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Poster = (props) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const id = props.postedBy;

  const handleDeleteBlogs = async () => {
    try {
      const response = await axios.delete(`/delete/blog/${props._id}`);
      if (response) {
        alert(response.data.message);
        props.getPostedBlogs();
      } else {
        alert("Blog not deleteds");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div
      id="scrollbar"
      className={`h-[45vh] flex flex-col items-start gap-2 shrink-1 px-1 py-3 rounded-lg m-2 overflow-auto relative ${
        props.isDark ? "bg-white/20" : "bg-black/15"
      }`}
    >
      {user && user._id == id ? (
        <div className="w-full flex flex-row items-center sticky right-1 bottom-1 justify-end gap-2 text-lg">
          <Link to={`/add/blog/${props._id}`}>
            <GrEdit className="text-blue-700 cursor-pointer" />
          </Link>
          <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
            <MdDelete className="text-red-700 text-xl" />
          </button>
        </div>
      ) : (
        ""
      )}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/2 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Are you sure, do you want to delete?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                If you click on Ok, then this blog will be deleted permanently.
              </p>
              <div className="mt-4 flex flex-row gap-2">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => handleDeleteBlogs()}
                >
                  OK
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Link to={`/blog/${props._id}`}>
        <div className="p-2 w-full relative">
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
      </Link>
    </div>
  );
};

export default Poster;
