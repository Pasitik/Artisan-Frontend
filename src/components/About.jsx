import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
    <section className="w-full flex bg-slate-200 md:p-10">
      <div className="w-1/2">
        <img
          className=" rounded-md"
          src="https://images.pexels.com/photos/848205/pexels-photo-848205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center md:mx-20">
        <h1 className=" font-bold text-5xl m-5" id="about">
          About
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed velit
          fugiat cupiditate fugit quos maxime minima modi at magni dicta
          repellat aliquam iusto fuga, suscipit optio eveniet. Ducimus
          doloremque, dolores exercitationem cumque est veniam cum corrupti
          dignissimos, accusamus repudiandae necessitatibus.
        </p>
        <p className=" font-semibold font-sans pt-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, libero
          minima sequi itaque corrupti obcaecati.
        </p>
        <div className="w-full flex my-10 justify-evenly">
          <Link to="instagram.com ">
            <FontAwesomeIcon
              className=" text-5xl text-purple-500"
              icon={faInstagram}
            />
          </Link>
          <Link to="facebook.com">
            <FontAwesomeIcon
              className=" text-5xl text-blue-500"
              icon={faFacebook}
            />
          </Link>
          <Link to="twitter.com">
            <FontAwesomeIcon
              className=" text-5xl text-blue-500"
              icon={faTwitter}
            />
          </Link>
          <Link to="youtube.com">
            <FontAwesomeIcon
              className=" text-5xl text-red-500"
              icon={faYoutube}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
