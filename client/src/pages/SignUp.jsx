import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateform,
  submitFormError,
  clearForm,
  formSubmitting,
} from "../redux/features/user/formSlice";
import api from "../utils/postAxios";
const url = "api/v1/sign-up";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";

const SignUp = () => {
  const { user_name, name, password } = useSelector(
    (state) => state.form.formData
  );
  const { isSubmitting, error } = useSelector((state) => state.form);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userToPost = {
      user_name,
      password,
      name,
    };
    try {
      dispatch(formSubmitting());
      const { data } = await api.post(`${url}`, JSON.stringify(userToPost), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      //add error handling from server

      console.log(data);
      dispatch(clearForm());
    } catch (e) {
      console.error(e);
    }
  };
  const handleInputChange = (e) => {
    dispatch(updateform({ field: e.target.id, data: e.target.value }));
  };
  const [isOpen, setIsOpen] = useState(false);
  const handlePassword = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className=" bg-[#fafbfc] min-h-screen text-[#56697e] flex justify-center">
      <div className="flex flex-col gap-9 xl:gap-4">
        <div className="mt-20">
          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[#11244d] font-extrabold text-2xl text-center">
              Sign up
            </h1>
            <p className="text-xl">
              Already have an account?
              <Link to={"/sign-in"} className="text-[#e01a66]">
                Login
              </Link>{" "}
              now
            </p>
          </div>
        </div>
        <div className="w-[414px] h-[430px] bg-white shadow-md rounded-xl">
          <form onSubmit={handleFormSubmit} className="p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <label htmlFor="user_name" className="font-bold text-md">
                Username
              </label>
              <input
                type="text"
                id="user_name"
                value={user_name}
                autoComplete="false"
                onChange={handleInputChange}
                placeholder="e.g. Joe"
                className="outline-none border p-3 "
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-bold text-md">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                autoComplete="false"
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
                  value={password}
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
              <button  className="text-white bg-gradient-to-br from-pink-400 to-red-600 w-full p-2 hover:opacity-90 transition-all ">
                {isSubmitting ? <p>submitting</p> : <p>Sign-up</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
