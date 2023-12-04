import { useEffect, useRef } from 'react';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtisan } from './SearchArtisanSlice';
import { useApi } from '../data/ApiProvider';

const SearchArtisan = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const api = useApi();
  // const [artisan, setArtisan] = useState([])
  const { status, data, error } = useSelector((state) => state.artisan);

  useEffect(() => {
    searchRef.current.focus();
    dispatch(fetchArtisan(async () => await api.fetchAllArtisans()));
  }, []);

  const handleSearch = (e) => {
    const searchValue = searchRef.current.value.toLowerCase();
    if (e.key === 'Enter') {
      if (!searchValue) {
        return;
      }
      dispatch(
        fetchArtisan(async () => await api.fetchArtisan(searchValue)),
      ).then((res) => {
        console.log(res);
      });
    }
    // dispatch an action
    console.log('------->', searchValue);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <main className=" h-screen w-screen">
      <NavBar />
      <div className="py-[4em] h-full bg-gray-50 flex">
        <section className="filters-section h-screen bg-gray-200 w-1/4 grid place-content-center">
          <p>filter 0</p>
          <p>filter 1</p>
          <p>filter 1</p>
          <p>filter 1</p>
          <p>filter 1</p>
        </section>
        <section className="search-section w-full h-screen py-[2em]">
          <h1 className="text-3xl font-bold text-center text-black-600 my-4 py-4">
            Find an artisan near you!{' '}
          </h1>

          <div className="w-[450px] flex items-center ml-4 border-2 border-black rounded-full bg-white">
            {
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-5 w-5 mx-1"
              />
            }
            <label htmlFor="search-box" className="rounded-full">
              search
            </label>
            <input
              id="search-box"
              type="search"
              className="py-4 focus:outline-none px-2 flex-1 rounded-full w-full"
              placeholder="capenter"
              ref={searchRef}
              onKeyDown={handleSearch}
            />
          </div>

          <section className="py-4 px-2 flex flex-col items-center">
            {data.map((artist) => (
              <figure
                key={artist.id}
                className="flex m-2 w-8/12 border-5 border border-gray-400"
              >
                <img src="./artisan.jpeg" width={200} height={200} />
                <figcaption className="px-2 flex flex-col justify-end ">
                  <p className="flex mx-1 capitalize">
                    <span className="mr-2 font-bold">Job title: </span>
                    {artist.job_title}
                  </p>
                  <div className="flex mx-1">
                    <span className="mr-2 font-bold">Ratings: </span>
                    <StarRating
                      totalStars={5}
                      ratings={artist.rating}
                      isRating={false}
                    />
                  </div>
                  <p className="flex mx-1 capitalize">
                    <span className="mr-2 font-bold">Location: </span>
                    {artist.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </section>
        </section>
      </div>
    </main>
  );
};

export default SearchArtisan;
{
  /* <article className="h-[30vh] overflow-hidden" >
		<h3>Summary: </h3>
		<p className="flex mx-1 max-w-[300px] max-h-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut deserunt error voluptas? Ea dolorem dolore labore cumque iusto accusantium nemo, dignissimos repellendus molestias perspiciatis sit hic repellat, exercitationem cupiditate alias?
				Id impedit reiciendis animi sed placeat assumenda hic perferendis, distinctio voluptatibus accusamus recusandae, possimus facere nihil, earum aut delectus eaque alias magnam? Quibusdam deserunt id maxime esse reiciendis facere commodi.
				Quidem magni consequuntur fuga soluta et, aperiam non necessitatibus modi minus eum nesciunt similique ad quisquam. Aspernatur dolor quia nisi voluptatibus ab, odit eveniet magnam quae quisquam architecto dolores quos?
				Non quia esse nostrum officiis, et, saepe similique dolorem mollitia ipsam veritatis sed. Nobis minima vel labore saepe voluptate placeat explicabo doloribus sed asperiores sint commodi, architecto ipsam vero corporis.
				Assumenda explicabo, perspiciatis nam harum animi modi, eligendi et ducimus officiis quasi illum accusantium amet quis sunt soluta, quia nisi beatae maiores sed tempore reiciendis voluptatibus! Laborum animi adipisci debitis?
				Ducimus, molestias facere. Quidem quos magni sed, molestias at eaque dolor quod repellendus, fuga ipsam numquam assumenda, inventore reiciendis quam id aperiam culpa omnis. Reiciendis optio quis iste doloribus. At.
				Vitae autem cumque ad ipsum tempore non accusamus quibusdam ipsam omnis? Molestias architecto est laudantium consequuntur, reprehenderit voluptatibus ducimus totam praesentium commodi dignissimos porro modi enim eligendi obcaecati dolores aliquam?
				Vitae aut quaerat, adipisci cupiditate aspernatur qui recusandae, unde error pariatur saepe laborum commodi reprehenderit delectus similique rerum sint maxime nulla deleniti impedit ad voluptatem! Assumenda sapiente deserunt nulla temporibus.
				Aliquid sapiente tenetur soluta quibusdam est ipsum corporis omnis labore. Eos cupiditate culpa, saepe laboriosam ipsam impedit ratione at, voluptates quos doloribus quia veniam ipsum aut? Non odio velit consectetur.
				Omnis, magni ipsum cumque ducimus iure non quo asperiores blanditiis laudantium consequatur dicta quod illum esse earum placeat iste, accusamus sit delectus maxime odio, minima quam! Veritatis quos maiores tempora.
			
				Voluptates temporibus, accusamus ipsa et eaque molestiae animi a, sint saepe doloribus autem debitis optio, aliquid reprehenderit beatae vel nesciunt. Officiis ut sapiente molestiae aliquam cumque amet similique, itaque sit!
				Animi eum optio porro quasi, quod nam nemo quam, quidem facere sapiente aspernatur. Doloremque odit cupiditate voluptatibus nostrum, earum molestias possimus recusandae eveniet voluptate minima! Corrupti, eos dolorem. Mollitia, dignissimos?
				Voluptatum odio magnam pariatur magni error illo quam minus doloremque, nemo numquam accusantium maxime voluptas assumenda iste perspiciatis officia doloribus veniam reprehenderit eius distinctio iure est. Culpa quasi tempora nostrum!</p>
		</article> */
}
