import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "./signupSlice";
import { loginUser } from "./loginSlice";
import AuthSide from "../../components/AuthSide";
import { useApi } from "../../data/ApiProvider";
import { signUpValidation } from "../../components/Validation";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isValidForm, setFormIsValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    membership: true,
  });

  const { status } = useSelector((state) => state.users);
  const api = useApi();

  useEffect(() => {
    if (
      formData.username &&
      formData.email &&
      formData.password &&
      confirmPassword
    ) {
      setFormIsValid(true);
    }
  }, [isValidForm, formErrors, formData]);

  const handleBlur = (e) => {
    let newErrors = { ...formErrors };
    const validationErrors = signUpValidation(
      e,
      e.target.name,
      newErrors,
      formData.password,
      confirmPassword,
    );

    setFormErrors(validationErrors);
  };

  const handleOnChange = (e) => {
    if (e.target.value.length > 0) {
      formErrors[e.target.name] = {};
      setFormErrors({});
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      setFormIsValid(false);
    } else {
      dispatch(signupUser(() => api.signup(formData))).then((result) => {
        setIsRegistered(true);

        setTimeout(() => {
          dispatch(
            loginUser(
              async () => await api.login(formData.username, formData.password),
            ),
          ).then((result) => {
            if (result.error && result.error.code === "ERR_BAD_REQUEST") {
              setError({
                hasError: true,
                message: "Invalid username or password",
              });
            } else {
              localStorage.setItem("authToken", result.payload.access);
              navigate("/");
            }
          });
        }, 2000);
        console.log("Registered");
      });
    }
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
            <p className="text-base mb-2">
              {isRegistered
                ? "Registration Successful!"
                : "Welcome! Please enter your details"}
            </p>
          </div>

          <div className="w-full flex flex-col">
            <form action="">
              <div>
                <input
                  name="username"
                  type="text"
                  placeholder="username"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.username && (
                  <p
                    hidden={!(formErrors.username.field === "username")}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.username.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.email && (
                  <p
                    hidden={!(formErrors.email.field === "email")}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.password && (
                  <p
                    hidden={!(formErrors.password.field === "password")}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.password.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onBlur={handleBlur}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.confirm_password && (
                  <p
                    hidden={
                      !(
                        formErrors.confirm_password.field === "confirm_password"
                      )
                    }
                    className="text-red-500 text-sm"
                  >
                    {formErrors.confirm_password.message}
                  </p>
                )}
              </div>

              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center">
                  <input
                    name="membership"
                    type="checkbox"
                    className="w-4 h-4 mr-2"
                    defaultChecked
                    onChange={(e) =>
                      setFormData({ ...formData, [e.target.name]: false })
                    }
                  />
                  <p className="text-sm">I am an artisan</p>
                </div>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  onClick={handleSignup}
                  disabled={status === "loading" || !isValidForm}
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
