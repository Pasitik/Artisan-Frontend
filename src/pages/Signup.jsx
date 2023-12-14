import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../features/login/signupSlice';
import AuthSide from '../components/AuthSide';
import { useApi } from '../data/ApiProvider';
import { signUpValidation } from '../components/Validation';
import { useUser } from '../data/UserProvider';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useApi();
  const { login } = useUser();
  const [formErrors, setFormErrors] = useState({});
  const [isValidForm, setFormIsValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    membership: true,
  });

  const { status } = useSelector((state) => state.users);

  useEffect(() => {
    if (
      formData.username &&
      formData.email &&
      formData.password &&
      confirmPassword
    ) {
      setFormIsValid(true);
    }
  }, [isValidForm, formErrors, formData, confirmPassword]);

  const handleBlur = () => {
    let newErrors = { ...formErrors };
    const validationErrors = signUpValidation(
      newErrors,
      formData.password,
      confirmPassword,
    );

    if (Object.keys(validationErrors).length === 0) {
      setFormIsValid(true);
    }

    setFormErrors(validationErrors);
  };

  const handleOnChange = (e) => {
    if (e.target.value.length > 0) {
      formErrors[e.target.name] = {};
      setFormErrors({});
    }
    if (e.target.name === 'confirm_password') {
      setConfirmPassword(e.target.value);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length > 0) {
      setFormIsValid(false);
    } else {
      dispatch(signupUser(() => api.signup(formData))).then((res) => {
        if (res.error) {
          const response = JSON.parse(res.error.message);
          let newErrors = { ...formErrors };
          const errorsArray = Object.entries(response);

          if (errorsArray.length > 0) {
            errorsArray.map(([key, value]) => {
              newErrors = {
                ...newErrors,
                [key]: {
                  message: value[0],
                  field: key,
                },
              };
            });
          } else {
            newErrors = {
              ...newErrors,
              confirm_password: {
                message: 'Unable to create account. Try again later',
                field: 'confirm_password',
              },
            };
          }
          setFormErrors(newErrors);
        } else {
          setIsRegistered(true);

          setTimeout(async () => {
            try {
              const res = await login(formData.username, formData.password);
              if (res.access) {
                navigate('/');
              }
            } catch (error) {
              return error.message;
            }
          }, 2000);
        }
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
                ? 'Registration Successful!'
                : 'Welcome! Please enter your details'}
            </p>
          </div>

          <div className="w-full flex flex-col">
            <form onSubmit={handleSignup}>
              <div>
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="username"
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.username && (
                  <p
                    hidden={!(formErrors.username.field === 'username')}
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
                  required
                  placeholder="Email"
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.email && (
                  <p
                    hidden={!(formErrors.email.field === 'email')}
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
                  required
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.password && (
                  <p
                    hidden={!(formErrors.password.field === 'password')}
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
                  required
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.confirm_password && (
                  <p
                    hidden={
                      !(
                        formErrors.confirm_password.field === 'confirm_password'
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
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                >
                  Register
                </button>
                {status === 'loading' ? 'Registering...' : ''}
              </div>
            </form>
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm mt-4">
            Have an account?{' '}
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
