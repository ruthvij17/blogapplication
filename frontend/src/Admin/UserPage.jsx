import React, { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";
import PosterSlider from "../Components/PosterSliderComponent";
import { MdDelete } from "react-icons/md";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const UserPage = () => {
  const [users, setUsers] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const getUsers = async () => {
    try {
      const response = await axios.get("/get/users/analytics");
      if (response) {
        setUsers(response.data.data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`user/${deleteId}`);
      alert(response.data.message);
      getUsers();
    } catch (error) {
      alert(error.message);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="w-[98vw] mx-2 flex flex-col gap-1">
        {users &&
          users.map((user, index) => {
            return (
              <div
                className="h-[48vh] w-full flex bg-black/15 rounded-lg p-1"
                key={index}
              >
                <div
                  className="h-full w-[20%] p-2 bg-white rounded-lg overflow-x-hidden flex flex-col items-center overflow-auto"
                  id="scrollbar"
                >
                  <Button
                    onClick={() => {
                      setIsOpen(true);
                      setDeleteId(user._id);
                    }}
                    className="w-full h-3 relative"
                  >
                    <MdDelete className="absolute top-1 right-1 text-2xl cursor-pointer text-red-500" />
                  </Button>
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
                            If you click on OK, then this user account will be
                            permanently deleted.
                          </p>
                          <div className="mt-4 flex flex-row gap-2">
                            <Button
                              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                              onClick={() => handleDelete()}
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
                  <img
                    src={
                      (user && user.profile.profileImage) ||
                      "https://verdantfox.com/static/images/avatars_default/av_blank.png"
                    }
                    alt="image not found"
                    className="rounded-full h-30 w-30  border-2 border-black"
                  />

                  <div className=" flex flex-col items-center">
                    <h1 className="text-2xl font-extrabold text-center">
                      {user.name}
                    </h1>
                    <p className="EMAIL w-[75%] text-center text-gray-900 text-sm">
                      {user.email}
                    </p>
                    <p className="BIO w-[75%] text-center text-gray-900 text-sm">
                      {user && user.profile.bio}
                    </p>

                    <div className="flex flex-row gap-3 mt-2 items-center justify-center">
                      <div className="flex flex-col items-center border-1 w-15 border-gray-400 px-4 py-1 rounded-lg">
                        <p className="font-bold">{user && user.blogs.length}</p>
                        <p className="text-xs">Blogs</p>
                      </div>
                      <div className="flex flex-col items-center border-1 w-15 border-gray-400 px-4 py-1 rounded-lg">
                        <p className="font-bold">
                          {user && user.profile.followers.length}
                        </p>
                        <p className="text-xs">Followers</p>
                      </div>
                      <div className="flex flex-col items-center border-1 w-15 border-gray-400 px-4 py-1 rounded-lg">
                        <p className="font-bold">
                          {user && user.profile.following.length}
                        </p>
                        <p className="text-xs">Following</p>
                      </div>
                    </div>
                    {/* <div className="flex justify-center text-gray-500 text-3xl lg:text-5xl my-6 gap-4">
                      {socialLinks &&
                        socialLinks.map(
                          (item, idx) =>
                            item.url && (
                              <Link key={idx} to={item.url}>
                                <div className="h-10 w-10 lg:h-8 lg:w-8 rounded-full overflow-hidden flex justify-center items-center hover:text-white">
                                  {socialMediaLinks[item.socialName]}
                                </div>
                              </Link>
                            )
                        )}
                    </div> */}
                  </div>
                </div>

                <div className="h-full w-[80%]">
                  <PosterSlider blogs={user.blogs} isDark={false} />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default AdminLayout(UserPage);
