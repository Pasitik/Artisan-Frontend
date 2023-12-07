import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  let Links = [
    { name: 'Home', link: '/home' },
    { name: 'About', link: '/about' },
    { name: 'Login', link: '/login' },
    { name: 'Signup', link: '/signup' },
  ];

  let [open, setOpen] = useState(false);

  return (
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
              open ? 'top-20 opacity-100 z-10' : 'top-[-490px]'
            } md:opacity-100`}
        >
          {Links.map((link) => {
            return (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to={link.link}
                  className="tex-gray-800 font-bold text-lg hover:text-gray-400 duration-500"
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
          <Link to={'/search'}>
            <button className=" bg-orange-400 text-white font-[Poppins] font-bold py-2 px-6 rounded md:ml-8 hover:bg-orange-300 duration-500">
              Get Started
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
