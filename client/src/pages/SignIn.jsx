import { useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/postAxios";
import { reducer, initialState } from "../utils/useReducer";
import { useState } from "react";
import {GiPadlock, GiPadlockOpen} from 'react-icons/gi'
const url = "api/v1/sign-in";

const SignIn = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: "button",
      payload: true,
    });
    const user = {
      name: state.formData.name,
      password: state.formData.password,
    };
    try {
      const { data } = await api.post(url, JSON.stringify(user), {
        headers: { "Content-Type": "application/json" },
      });
      console.log(data);
    } catch (error) {
      console.log(error.stack);
    }
    dispatch({ type: "reset" });
    dispatch({ type: "button", payload: false });
    navigate("/");
  };
  const handleInputChange = (e) => {
    dispatch({
      type: "input",
      field: e.target.id,
      payload: e.target.value,
    });
  };
  const handlePassword = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className=" bg-[#fafbfc] min-h-screen text-[#56697e] flex justify-center">
      <div className="flex flex-col gap-9 xl:gap-4">
        <div className="mt-20">
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[#11244d] font-extrabold text-2xl text-center">
              Sign In
            </h1>
            <p className="text-xl">
              Already have an account?
              <Link to={"/sign-up"} className="text-[#e01a66]">
                SignUp
              </Link>{" "}
              now
            </p>
          </div>
        </div>
        <div className="w-[414px] h-[400px] bg-white shadow-md rounded-xl">
          <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-bold text-md">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={state.formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Joe"
                className="outline-none border p-3 "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-bold text-md">
                Password
              </label>
              <div className="flex relative">
                <input
                  type={isOpen ? "text" : "password"}
                  id="password"
                  value={state.formData.password}
                  onChange={handleInputChange}
                  placeholder="e.g. Joe@.3432"
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
            </div>
            <div className="w-full">
              <button className="text-white bg-gradient-to-br from-pink-400 to-red-600 w-full p-2 hover:opacity-90 transition-all ">
                {state.isSubmitting ? <p> submitting...</p> : <p>Sign-In</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
