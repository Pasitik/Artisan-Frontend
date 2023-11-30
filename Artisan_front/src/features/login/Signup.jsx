import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "./signupSlice";
import Validation from "../../components/Validation";
import AuthSide from "../../components/AuthSide";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    membership: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const { status, error } = useSelector((state) => state.users);

  const target_ = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    Validation(formData, confirmPassword);
  };
  const handleSignup = (e) => {
    e.preventDefault();
    // if (handleValidation){
    //   return console.log("error")
    // }
    dispatch(signupUser(formData)).then((result) => {
      console.log(result);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
      console.log("Registered");
    });
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
        <h1 className="text-base text-[#060606] font-semibold mb-2">
          ArtisanBay
        </h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-5">
            <h1 className="text-3xl font-semibold mb-2">Register</h1>
            <p className="text-base mb-2">Welcome! Please enter your details</p>
          </div>

          <div className="w-full flex flex-col">
            <form action="">
              <input
                name="username"
                type="text"
                placeholder="username"
                onChange={target_}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={target_}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={target_}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />

              <input
                name="confirm Pasword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />

              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center">
                  <input
                    name="membership"
                    type="checkbox"
                    className="w-4 h-4 mr-2"
                    onChange={(e) =>
                      setFormData({ ...formData, [e.target.name]: true })
                    }
                  />
                  <p className="text-sm">I am an artisan</p>
                </div>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  onClick={handleSignup}
                  disabled={status === "loading"}
                  className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                >
                  Register
                </button>
                {status === "loading" ? "Registering..." : ""}
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm mt-4">
            Have an account?{" "}
            <Link to="/login">
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Log in here
              </span>
            </Link>
          </p>
        </div>
      </div>

      <AuthSide />
    </div>
  );
};

export default SignupForm;
