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
    <section className="w-full md:flex bg-slate-200 md:p-10">
      <div className="md:flex md:w-1/2 hidden items-center">
        <img
          className=" rounded-md"
          src="https://images.pexels.com/photos/848205/pexels-photo-848205.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className=" w-full md:w-1/2 flex flex-col items-center justify-center px-10 md:mx-20">
        <h1 className=" font-bold text-5xl m-5" id="about">
          About
        </h1>
        <p className=" text-center">
          Welcome to ArtisanBay, your go-to platform for connecting with skilled
          artisans in your local community. We understand the value of
          craftsmanship and the importance of finding reliable professionals for
          your projects, be it carpentry, plumbing, electrical work, or other
          artisanal services. ArtisanBay simplifies the process of discovering
          and hiring talented individuals right in your neighborhood. At
          ArtisanBay, we prioritize quality, reliability, and community
          collaboration. Our platform not only helps you find the right artisan
          for your needs but also fosters a sense of community by showcasing the
          talents of local craftsmen. We believe in the power of connecting
          people with the skills and expertise they require, promoting a vibrant
          ecosystem of trades and services.
        </p>
        <p className=" font-semibold font-sans pt-3 text-center">
          Join us in supporting local artisans and building a stronger, more
          connected community. Whether you're a homeowner in search of skilled
          professionals or an artisan looking to showcase your expertise,
          ArtisanBay is here to bridge the gap and make the process seamless.
          Welcome to a community where craftsmanship thrives, and connections
          are made.
        </p>
        <div className="w-full flex my-10 justify-evenly">
          <Link to="instagram.com ">
            <FontAwesomeIcon
              className=" text-3xl lg:text-5xl text-purple-500"
              icon={faInstagram}
            />
          </Link>
          <Link to="facebook.com">
            <FontAwesomeIcon
              className=" text-3xl lg:text-5xl text-blue-500"
              icon={faFacebook}
            />
          </Link>
          <Link to="twitter.com">
            <FontAwesomeIcon
              className=" text-3xl lg:text-5xl text-blue-500"
              icon={faTwitter}
            />
          </Link>
          <Link to="youtube.com">
            <FontAwesomeIcon
              className=" text-3xl lg:text-5xl text-red-500"
              icon={faYoutube}
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
