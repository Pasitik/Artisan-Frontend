import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AuthSide from '../components/AuthSide';
import { useUser } from '../data/UserProvider';

const LoginForm = () => {
  const [error, setError] = useState({
    hasError: false,
    message: '',
  });

  const [formError, setFormError] = useState({
    message: '',
    fieldname: '',
  });
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useUser();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { status } = useSelector((state) => state.users);

  useEffect(() => {
    usernameRef.current.focus();
    if (!usernameRef.current.value || !passwordRef.current.value) {
      setError({ hasError: true, message: '' });
    }
  }, []);

  const handleOnChange = (e) => {
    if (e.target.value.length > 0) {
      setFormError({
        message: '',
      });
    }
    if (e.target.value) {
      setError({ hasError: false, message: '' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const res = await login(username, password);
      if (res.access) {
        navigate('/');
      }
    } catch (error) {
      setError({ hasError: true, message: error.message });
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-start">
        <AuthSide />

        <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
          <h1 className="text-base text-[#060606] font-semibold mb-2">
            ArtisanBay
          </h1>

          <div className="w-full flex flex-col max-w-[550px]">
            <div className="w-full flex flex-col mb-5">
              <h1 className="text-3xl font-semibold mb-2">Login</h1>
              <p className="text-base mb-2">
                Welcome Back! Please enter your details
              </p>
            </div>

            <div className="w-full flex flex-col">
              <form onSubmit={handleLogin}>
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  ref={usernameRef}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <p
                  hidden={!(formError.fieldname === 'username')}
                  className="text-red-500 text-sm"
                >
                  {formError.message}
                </p>

                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  ref={passwordRef}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <p
                  hidden={!(formError.fieldname === 'password')}
                  className="text-red-500 text-sm"
                >
                  {formError.message}
                </p>
                <p hidden={!error.hasError} className="text-red-500 text-sm">
                  {error.message}
                </p>
                <div className="w-full flex items-center justify-center">
                  <div className="w-full flex items-center">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                    <p className="text-sm">Remember me</p>
                  </div>

                  <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                    Forgot Password?
                  </p>
                </div>

                <div className="w-full flex flex-col my-4">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                  >
                    Login
                  </button>
                  {status === 'loading' ? 'Loging in...' : ''}

                  <Link to="/register">
                    <button className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center">
                      Register
                    </button>
                  </Link>
                </div>

                <div className="w-full flex items-center justify-center relative py-2">
                  <div className="w-full h-[1px] bg-black"></div>
                  <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">
                    or
                  </p>
                </div>

                <div className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                  <img
                    src="https://tse4.mm.bing.net/th?id=OIP.lU3lYqlNUHIP3WoHZlWppAHaHa&pid=Api&P=0&h=220"
                    className="h-6 mr-2"
                  />
                  Sign In With Google
                </div>

                <div className="w-full flex items-center justify-center">
                  <p className="text-sm mt-4">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup">
                      {' '}
                      <span className="font-semibold underline underline-offset-2 cursor-pointer">
                        Sign up for free
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
