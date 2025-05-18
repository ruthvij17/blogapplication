import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const EditProfileComponent = ({ setIsOpen }) => {
  const [name, setName] = useState();
  const [profileImage, setProfileImage] = useState();
  const [bio, setBio] = useState();

  const { id } = useParams();

  const socialMedia = [
    { socialName: "instagram", url: "" },
    { socialName: "twitter", url: "" },
    { socialName: "facebook", url: "" },
    { socialName: "youtube", url: "" },
    { socialName: "linkedin", url: "" },
    { socialName: "pinterest", url: "" },
  ];

  const [socialLinks, setSocialLinks] = useState(socialMedia);

  const handleInputChange = (index, event) => {
    const newInputs = [...socialLinks];
    newInputs[index].url = event.target.value; // Update the value of the textbox at the given index
    setSocialLinks(newInputs);
  };

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await axios.get(`/get/profile/details/${id}`);
        if (response.data) {
          setBio(response.data.profile.bio);
          setProfileImage(response.data.profile.profileImage);
          setName(response.data.profile.name);
          const array = response.data.profile.socialLinks;

          const mergedArray = socialMedia.map((item1) => {
            // Find the matching object from array2 based on the 'id'
            const match = array.find(
              (item2) => item2.socialName === item1.socialName
            );

            if (match) {
              // If there's a match, modify the 'name' field from array2 and return the merged object
              return { ...item1, url: match.url };
            }

            // If no match, keep the object from array1 unchanged
            return item1;
          });
          setSocialLinks(mergedArray);
        }
      } catch (error) {
        alert(error.message);
      }
    };
    getProfileDetails();
  }, []);

  const handleSubmit = async () => {
    if (!name) {
      alert("Please enter the name");
      return;
    }
    try {
      const response = await axios.post(`/post/profile/${id}`, {
        name,
        bio,
        profileImage,
        socialLinks,
      });
      alert(response.data.message);
      setIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed p-4 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-black w-[30vw] z-10 text-white rounded-lg">
      <h1 className="text-3xl font-extrabold mb-2">Edit profile</h1>
      <form
        className="flex flex-col gap-2 max-h-[80vh] overflow-auto capitalise "
        id="scrollbar"
      >
        <label>Edit Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>Profile Image:</label>
        <input
          type="url"
          value={profileImage}
          onChange={(e) => setProfileImage(e.target.value)}
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>Bio:</label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <h1 className="text-xl font-bold">Social Media Links</h1>
        {/* <label>Instagram</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>X(Twitter)</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>Facebook</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>Youtube</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>LinkedIn</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        />
        <label>Pinterest</label>
        <input
          type="url"
          className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
        /> */}
        {socialLinks.map((ele, index) => {
          return (
            <>
              <label className="capitalize">{ele.socialName}:</label>
              <input
                type="url"
                value={ele.url}
                onChange={(e) => handleInputChange(index, e)}
                className="rounded-sm px-2 py-1 outline-none bg-white/10 placeholder:text-[rgba(255,255,255,0.2)]"
              />
            </>
          );
        })}
      </form>
      <div className="flex flex-row gap-3 justify-end sticky pt-1">
        <input
          type="button"
          value="Close"
          className="px-5 py-2 bg-[rgba(255,255,255,0.2)] rounded-lg active:bg-[rgba(255,255,255,0.1)]"
          onClick={() => setIsOpen(false)}
        />
        <input
          type="submit"
          value="Save Changes"
          className="px-5 py-2 bg-blue-600 rounded-lg active:bg-blue-400"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default EditProfileComponent;
