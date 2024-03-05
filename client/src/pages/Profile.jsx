import { useEffect, useRef, useState } from "react";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../utils/FirebaseConfig";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [image, setImage] = useState(undefined);
  const handlePassword = () => {
    setIsOpen(!isOpen);
  };
  const handleUploadImage = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (image) {
      handleUploadImageFirebase();
    }
  }, [image]);

  const handleUploadImageFirebase = () => {
    const storage = getStorage(app); // creates an instance of a storage service
    const fileName = new Date().getTime() + image.name; // generate a unique file name
    const storageRef = ref(storage, fileName); // create a reference to the storage service with the file stored in it or the path
    const uploadTask = uploadBytesResumable(storageRef, image); // starts an async acton to upload the image to  the referenced storage

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //percentage of bytes transferred on each progress made
     setUploadProgress(Math.round(progress))
    });
  };
  return (
    <div className="h-[80vh]">
      <h1 className="font-bold text-center mt-9 text-3xl text-blue-700">
        User Profile
      </h1>
      <div className=" max-w-[400px] mx-auto">
        <form className="flex flex-col items-center gap-4 mt-6 cursor-pointer  ">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
          <div className="rounded-full">
            <img
              onClick={handleUploadImage}
              src={currentUser.avatarUrl}
              className="rounded-full object-contain"
            />
          </div>
          <input
            autoComplete="false"
            type="text"
            id="user_name"
            placeholder="username"
            className="outline-none border p-3  w-full rounded-md"
          />
          <input
            type="text"
            id="email"
            placeholder="email"
            className="outline-none border p-3  w-full rounded-md"
          />
          <div className="flex relative w-full">
            <input
              type={isOpen ? "text" : "password"}
              id="password"
              placeholder="password"
              className="outline-none border relative p-3 flex-1 "
            />
            {!isOpen ? (
              <GiPadlock
                onClick={handlePassword}
                className="absolute right-4 top-4 text-xl text-red-800 cursor-pointer"
              />
            ) : (
              <GiPadlockOpen
                onClick={handlePassword}
                className="absolute right-4 top-4 text-xl text-red-800 cursor-pointer"
              />
            )}
          </div>

          <button className="w-full bg-blue-400 p-3 rounded-md shadow-md hover:bg-green-300 text-white">
            Update Profile
          </button>
        </form>
        <div className="flex justify-between mt-3">
          <span className="text-red-600 font-semibold cursor-pointer">
            Delete Account
          </span>
          <span className="text-pink-900 font-semibold">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
