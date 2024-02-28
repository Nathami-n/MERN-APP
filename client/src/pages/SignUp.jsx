import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { reducer, initialState } from "../utils/useReducer";

const SignUp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className=" bg-[#fafbfc] h-screen text-[#56697e] flex justify-center">
     <div  className="flex flex-col gap-9 xl:gap-4">
      <div className="mt-20">
        <div className="flex flex-col gap-1 items-center">
          <h1 className="text-[#11244d] font-extrabold text-2xl text-center">
            Sign up
          </h1>
          <p className="text-xl">
            Already have an account?<Link to={"/sign-in"} className="text-[#e01a66]">Login</Link> now
          </p>
        </div>
      </div>
      <div className="w-[414px] h-[498px] bg-white shadow-md rounded-xl">
        <form onSubmit={handleFormSubmit} className="p-6">
        <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold text-md">Name</label>
          <input
          type="text"
          placeholder="e.g. Joe"
          className="outline-none border p-3 "
          
          />
        </div>


        </form>
      </div>
      </div>
    </section>
  );
};

export default SignUp;
