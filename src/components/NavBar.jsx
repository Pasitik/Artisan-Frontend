import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../data/UserProvider';
import UserProfileDropdown from '../components/UserProfileDropdown';
import { HashLink as NavLink } from 'react-router-hash-link';

const NavBar = () => {
  let Links = [
    { name: 'Home', link: '/home', smooth: false },
    { name: 'Search', link: '/search', smooth: false },
    { name: 'About', link: '/#about', smooth: true },
    { name: 'Log in', link: '/login', smooth: false },
  ];

  let [open, setOpen] = useState(false);
  const { user, logout } = useUser();

  return (
    <>
      <div className="shadow-md w-full top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div className="font-bold text-3xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className=" text-green-400">Artisan</span>
            <span className=" text-orange-400">Bay</span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden"
          >
            <FontAwesomeIcon icon={open ? faTimes : faBars} />
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:bg-white bg-gray-300 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9
            transition-all duration-500 ease-in ${
              open ? 'top-20 opacity-100 z-[1]' : 'top-[-490px]'
            } md:opacity-100`}
          >
            {Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 text-xl md:my-0 my-7"
                hidden={user && link.name === 'Log in'}
              >
                <NavLink
                  to={link.link}
                  className="text-gray-800 font-bold text-lg hover:text-gray-400 duration-500"
                  smooth={Links.smooth}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            <Link to={'register'} hidden={user}>
              <button className=" bg-orange-400 text-white font-[Poppins] font-bold py-2 px-6 rounded md:ml-8 hover:bg-orange-300 duration-500">
                Get Started
              </button>
            </Link>

            {user && (
              <>
                <li className="md:ml-8 text-md md:my-0 my-7">
                  {user.username}
                </li>
                <li className="md:ml-8 text-xl md:my-0 my-7">
                  <UserProfileDropdown user={user} logout={logout} />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
