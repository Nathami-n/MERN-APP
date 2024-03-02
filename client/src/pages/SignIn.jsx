import { Link, useNavigate } from "react-router-dom";
import api from "../utils/postAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearForm,
  formSubmitting,
  submitFormError,
  updateform,
} from "../redux/features/user/formSlice";
import { useState } from "react";
import { GiPadlock, GiPadlockOpen } from "react-icons/gi";
import { setUser } from "../redux/features/user/userSlice";
const url = "api/v1/sign-in";

const SignIn = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.form.formData);
  const { isSubmitting } = useSelector((state) => state.form);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const sendUser = {
      email,
      password,
    };
    try {
      dispatch(formSubmitting());
      const { data } = await api.post(url, JSON.stringify(sendUser), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(setUser({ user: data.data }));
      dispatch(clearForm());
      navigate("/");
    } catch (error) {
      dispatch(submitFormError({ data: error.message }));
    }
  };
  const handleInputChange = (e) => {
    dispatch(updateform({ field: e.target.id, data: e.target.value }));
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
              <label htmlFor="email" className="font-bold text-md">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
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
              <button className="text-white bg-gradient-to-br from-pink-400 to-red-600 w-full p-2 hover:opacity-90 transition-all ">
                {isSubmitting ? <p>submitting...</p> : <p>Sign-In</p>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
