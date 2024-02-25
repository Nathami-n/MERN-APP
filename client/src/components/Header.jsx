import { Link } from "react-router-dom";
import {CiSearch} from 'react-icons/ci'

const Header = () => {
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
          <Link to={'/sign-in'} className="sm:inline  text-md sm:text-xl hover:text-blue-500 hover:underline">
            Sign in
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
