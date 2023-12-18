import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const UserProfileDropdown = ({ user, logout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <div className="relative ">
      <button
        className="text-gray-800 font-bold  focus:outline-none flex justify-center"
        onClick={toggleDropdown}
      >
        {user && (
          <img
            className="h-full border-2 rounded-full max-h-[40px] max-w-[40px] object-cover"
            src={
              user.photos.length > 0
                ? BASE_API_URL + '/media/' + user.photos[0].photo
                : '../pphoto.png'
            }
            alt=""
            width={40}
            height={40}
          />
        )}
      </button>
      {isDropdownOpen && (
        <div className="w-[150px] py-1 px-1 absolute top-full right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg">
          <ul>
            <li
              className="w-full border-b-2 text-[1rem] my-1 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </li>
            <Link
              to={'/artisan/profile'}
              onClick={() => setDropdownOpen(false)}
            >
              <li className="w-full text-[1rem] my-1 px-4 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
export default UserProfileDropdown;
