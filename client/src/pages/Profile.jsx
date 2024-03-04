import { useSelector } from "react-redux";

const Profile = () => {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <div className="h-[80vh]">
       <h1 className="font-bold text-center mt-9 text-3xl text-blue-700">User Profile</h1>
       <div className="">
        <form className="flex flex-col items-center gap-4 mt-6 cursor-pointer max-w-[400px] mx-auto">
          <div className="rounded-full">
            <img src={currentUser.avatarUrl} className="rounded-full object-contain"/>
          </div>
          <input type='text' id="user_name"   placeholder='username' className="outline-none border p-3  w-full rounded-md"/>
          <input type='text' id="email"   placeholder='email' className="outline-none border p-3  w-full rounded-md"/>
          <input type='text' id="password"   placeholder='password' className="outline-none border p-3  w-full rounded-md"/>

          <button className="w-full bg-blue-400 p-3 rounded-md shadow-md hover:bg-green-300 text-white">Update Profile</button>
        </form>
        <div className="flex justify-between"><span>Delete Account</span><span>Log out</span></div>
       </div>
    </div>
  )
};

export default Profile;
