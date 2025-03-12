import React, { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";
import PosterSlider from "../Components/PosterSliderComponent";

const UserPage = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
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
                  className="h-full w-[20%] bg-white rounded-lg overflow-x-hidden flex flex-col items-center overflow-auto"
                  id="scrollbar"
                >
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
