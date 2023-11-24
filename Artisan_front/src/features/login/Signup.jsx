import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "./signupSlice";
import AuthSide from "../../components/AuthSide";


const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profession, setProfession] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const { status, error} = useSelector ((state) => state.users)

  const handleSignup = (e) => {
    e.preventDefault()
    let userData={
      name, email, password,
    }
    console.log(userData)
    dispatch(signupUser(userData)).then((result)=>{
      setEmail('')
      setPassword('')
      navigate('/login')
      console.log("Registered")
    })
  }
  
return (
  <div className="w-full h-screen flex items-start">
    
    <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
      <h1 className="text-base text-[#060606] font-semibold mb-2">ArtisanBay</h1>

      <div className="w-full flex flex-col max-w-[550px]">
        <div className="w-full flex flex-col mb-5">
          <h1 className="text-3xl font-semibold mb-2">Register</h1>
          <p className="text-base mb-2">Welcome! Please enter your details</p>
        </div>

        <div className="w-full flex flex-col">
          <form action="">
          <input 
              type="text"
              placeholder="username"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />

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

            <input 
              type="text"
              placeholder="Confirm Password"
              value=""
              onChange=""
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />

            <div className="w-full flex flex-col my-4">
              <button 
                onClick={handleSignup} 
                disabled = {status === 'loading'}
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
        <p className="text-sm mt-4">Have an account? <Link to="/login"><span className="font-semibold underline underline-offset-2 cursor-pointer">Log in here</span></Link></p>
      </div>
    </div>

    <AuthSide />
  </div>
)};

export default SignupForm;
