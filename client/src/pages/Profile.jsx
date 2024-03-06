import { useEffect, useRef, useState } from "react";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/FirebaseConfig";
import api from "../utils/postAxios";
import { setUser } from "../redux/features/user/userSlice";
import { useDispatch } from "react-redux";
import { updateform } from "../redux/features/user/formSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { updatedUser } = useSelector((state) => state.profile);
  const { email, user_name, password } = useSelector(
    (state) => state.form.formData
  );
  const postUrl = `/api/v1/profile/${currentUser._id}`;
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [image, setImage] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formUpload, setFormUpload] = useState({ _id: currentUser._id });
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
    try {
      const storage = getStorage(app); // creates an instance of a storage service
      const fileName = new Date().getTime() + image.name; // generate a unique file name
      const storageRef = ref(storage, fileName);

      // create a reference to the storage service with the file stored in it or the path
      const uploadTask = uploadBytesResumable(storageRef, image); // starts an async acton to upload the image to  the referenced storage
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100; //percentage of bytes transferred on each progress made
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormUpload((prevFormUpload) => ({
              ...prevFormUpload,
              imageUrl: downloadUrl,
            }));
          });
        }
      );
    } catch (e) {
      console.error(e);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(postUrl, JSON.stringify(formUpload), {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(setUser({ user: data.data }));
    } catch (error) {
      console.error(error);
    }
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
            onChange={(e) =>
              dispatch(updateform({ field: e.target.id, data: e.target.value }))
            }
            autoComplete="false"
            type="text"
            value={user_name}
            id="user_name"
            placeholder="username"
            className="outline-none border p-3  w-full rounded-md"
          />
          <input
            onChange={(e) =>
              dispatch(updateform({ field: e.target.id, data: e.target.value }))
            }
            type="text"
            id="email"
            value={email}
            placeholder="email"
            className="outline-none border p-3  w-full rounded-md"
          />
          <div className="flex relative w-full">
            <input
              onChange={(e) =>
                dispatch(
                  updateform({ field: e.target.id, data: e.target.value })
                )
              }
              type={isOpen ? "text" : "password"}
              id="password"
              value={password}
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

          <button
            onClick={handleUpdateProfile}
            className="w-full bg-blue-400 p-3 rounded-md shadow-md hover:bg-green-300 text-white"
          >
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
