import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { useUser } from '../data/UserProvider';
import About from '../components/About';

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      <NavBar />
      <section id="hero" className="py-5 h-[100vh]">
        <div className="contaoner flex flex-wrap items-center justify-center mx-auto mt-10 md:px-12 md:flex-row">
          <div className="mb-14 lg:mb-0 lg:w-1/2">
            <h1 className="max-w-xl text-[2.9rem] leading-none text-gray-800 font-bold font-sans text-center lg:text-5xl lg:text-left lg:leading-tight mb-5">
              Find professional artisans near you with speed and super ease !!!
            </h1>
            <p className="max-w-xl text-center text-grey-500 lg:text-left lg:max-w-md">
              We offer a wide range of services to help you grow your business.
              Whether it&apos;s designing an app, creating a website or
              providing digital support.
            </p>
            <div className="flex justify-center mt-14 lg:justify-start">
              <Link to="more">
                <button
                  type="button"
                  className="text-white bg-green-500 font-medium rounded-lg px-5 py-4 text-center hover:bg-green-300 houver:drop-shadow-md transition duration-300 ease-in-out"
                >
                  Learn more
                </button>
              </Link>
              {user && !user.isArtisan && (
                <Link to="artisan/join">
                  <button
                    type="button"
                    className="ml-5 text-white bg-orange-400 font-medium rounded-lg px-5 py-4 text-center hover:bg-orange-300 houver:drop-shadow-md transition duration-300 ease-in-out"
                  >
                    Join Artisans
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="ld:w-1/2">
            <img
              className="ml-auto h-[70vh] rounded-lg"
              src="https://images.pexels.com/photos/8817854/pexels-photo-8817854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="hero-img"
            />
          </div>
        </div>
      </section>
      <About />
    </div>
  );
};

export default Home;
