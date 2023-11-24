import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "./loginSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthSide from "../../components/AuthSide";


const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { status, error} = useSelector ((state) => state.users)

  const handleLogin = (e) => {
    e.preventDefault()
    let userData={
      email,
      password
    }
    console.log(userData)
    dispatch(loginUser(userData)).then((result)=>{
      setEmail('')
      setPassword('')
      navigate('/')
      console.log("we are in")
    })
  }

  return (
    <div className="w-full h-screen flex items-start">
      <AuthSide />

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
        <h1 className="text-base text-[#060606] font-semibold mb-2">ArtisanBay</h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-5">
            <h1 className="text-3xl font-semibold mb-2">Login</h1>
            <p className="text-base mb-2">Welcome Back! Please enter your details</p>
          </div>

          <div className="w-full flex flex-col">
            <form action="">
              <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              />
              <div className="w-full flex items-center justify-center">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="w-4 h-4 mr-2"/>
                  <p className="text-sm">Remember me</p>
                </div>

                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password?</p>
              </div>

              <div className="w-full flex flex-col my-4">
                <button 
                  onClick={handleLogin} 
                  disabled = {status === 'loading'}
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                  >
                    Login
                  </button>
                {status === 'loading' ? 'Loging in...' : ''}
                
                <Link to="/signup">
                  <button 
                    className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center"
                    >
                      Register
                  </button>
                </Link>
              </div>

              <div className="w-full flex items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black"></div>
                <p className="text-lg absolute text-black/80 bg-[#f5f5f5]">or</p>
              </div>

              <div className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                <img src="https://tse4.mm.bing.net/th?id=OIP.lU3lYqlNUHIP3WoHZlWppAHaHa&pid=Api&P=0&h=220"
                  className="h-6 mr-2"/>
                  Sign In With Google
              </div>

              <div className="w-full flex items-center justify-center">
                <p className="text-sm mt-4">Don't have an account? <Link to="/signup"> <span className="font-semibold underline underline-offset-2 cursor-pointer">Sign up for free</span></Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
