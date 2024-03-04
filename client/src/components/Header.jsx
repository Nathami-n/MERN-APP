import { Link } from "react-router-dom";
import {CiSearch} from 'react-icons/ci'
import {useSelector} from 'react-redux'

const Header = () => {
  const {currentUser} = useSelector((state)=> state.user)
  return (
    <header className="w-full bg-gray-300">
      <div className=" p-2 flex justify-between max-w-7xl mx-auto items-center">
        <div>
          <h1 className="text-xl font-bold flex justify-center items-center">
            <span className="">CITA</span>
            <span className="text-red-600">HOMES</span>
          </h1>
        </div>
        <div>
          <form className="p-1 flex items-center bg-white rounded-lg">
            <input
              type="text"
              className="p-3 bg-transparent outline-none w-32 sm:w-64"
              placeholder="search..."
            />
            <CiSearch className=" text-xl cursor-pointer"/>
          </form>
        </div>
        <ul className="flex gap-3">
          <Link to={'/'} className="hidden  text-md sm:text-xl  sm:inline hover:text-blue-500 hover:underline">
            Home
          </Link>
          <Link to={'/about'} className=" sm:inline text-md sm:text-xl hover:text-blue-500 hover:underline">
            About
          </Link>
          <Link to={'/profile'} className="sm:inline  text-md sm:text-xl hover:text-blue-500 hover:underline">
            {currentUser ? <img src= {currentUser.avatarUrl} alt="avatar" className="rounded-full object-cover h-8 w-8 ml-3"/> : <p>Sign-In</p>}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
