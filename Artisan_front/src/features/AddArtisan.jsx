import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { loginUser } from "./loginSlice";
import { useNavigate, Link } from "react-router-dom";
import AuthSide from "../components/AuthSide";

const AddArtisan = () => {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  //   const { status, error } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));

    //console.log(formData);
    //   dispatch(loginUser(formData)).then((result) => {
    //     console.log(result);
    //     setFormData({
    //       username: "",
    //       password: "",
    //     });
    // navigate("/");
    console.log("we are in");
    //   });
  };

  return (
    <div className="w-full h-screen flex items-start">
      <AuthSide />

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
        <h1 className="text-base text-[#060606] font-semibold mb-2">
          ArtisanBay
        </h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-5">
            <h1 className="text-3xl font-semibold mb-2">
              Join The Artisan Pool
            </h1>
            <p className="text-base mb-2">Please enter your details</p>
          </div>

          <div className="w-full flex flex-col">
            <form action="">
              <div>
                <label hidden htmlFor="houseno"></label>
                <input
                  id="houseno"
                  name="houseno"
                  type="text"
                  placeholder="House number"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
              <div>
                <label hidden htmlFor="street"></label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Street name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
              <div>
                <label hidden htmlFor="city"></label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>
              <div>
                <label hidden htmlFor="state"></label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State / Province"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtisan;
