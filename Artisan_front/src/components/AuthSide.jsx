import React from 'react'

const AuthSide = () => {
  return (
    <div className="relative w-1/2 h-full flex flex-col">
      <div className="absolute top-[20%] left-[10%] flex flex-col">
        <h1 className="text-4xl text-[#E0E0E0] font-bold my-4">Turn Your Craft into a Business </h1>
        <p className="text-xl text-white font-normal">Start for free and enjoy attractive offers from our artisans</p>
      </div>
      <img src="https://images.pexels.com/photos/5691546/pexels-photo-5691546.jpeg" 
      className="w-full h-full object-cover"
      />
    </div>
  )
}

export default AuthSide