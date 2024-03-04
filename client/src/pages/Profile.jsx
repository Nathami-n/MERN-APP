import { useState } from "react";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const handlePassword = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-[80vh]">
      <h1 className="font-bold text-center mt-9 text-3xl text-blue-700">
        User Profile
      </h1>
      <div className=" max-w-[400px] mx-auto">
        <form className="flex flex-col items-center gap-4 mt-6 cursor-pointer  ">
          <div className="rounded-full">
            <img
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
          <span>Delete Account</span>
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
