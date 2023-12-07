import { useCallback, useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import StarRating from '../components/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtisan } from './SearchArtisanSlice';
import { useApi } from '../data/ApiProvider';
import Pagination from '../components/Pagination';
import SearchFilters from '../features/SearchFilters';

const SearchArtisan = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const api = useApi();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [locationFilter, setLocationFilter] = useState('');

  const { status, data, error } = useSelector((state) => state.artisan);
  // const check = data && data.results

  useEffect(() => {
    dispatch(
      fetchArtisan(async () => await api.fetchArtisansPerPage(currentPage)),
    ).then(() =>  searchRef.current.focus())
  }, [currentPage, dispatch, api]);

  useEffect(() => {
    searchRef.current.focus();
    (async () => {
      if (locationFilter.trim() !== '') {
        const res = searchItem ? await api.fetchArtisan(searchItem) : await api.fetchArtisansPerPage(currentPage)

        if (locationFilter && res && res.results) {
  
          const filteredData = () =>
            res.results.filter((artisan) => {
              if (
                artisan.addresses[0] &&
                artisan.addresses[0].state == locationFilter
              ) {
                return artisan;
              }
            });
  
          dispatch(fetchArtisan(() => ({ results: filteredData() })))
          .then(() =>  searchRef.current.focus());
        }
      
      }
    })()
  }, [locationFilter, dispatch, api, currentPage, searchItem]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();

    if (e.key === 'Enter' && searchValue.trim() !== '') {
      dispatch(
        fetchArtisan(async () => await api.fetchArtisan(searchItem)),
      ).then(() => {
        searchRef.current.focus();
      });

      setCurrentPage(1);
    }
  };

  // const handleFilters
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <main className=" h-screen w-screen">
      <NavBar />
      <div className="h-full bg-gray-50 flex">
        <SearchFilters
          // handleSearch={handleLocationSearch}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
        />
        <section className="search-section w-full h-screen">
          <h1 className="text-3xl font-bold text-center text-black-600 my-3 pt-4">
            Find an artisan near you!{' '}
          </h1>

          <div className="w-[450px] flex items-center ml-4 border-2 border-black rounded-full bg-white">
            {
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="h-4 w-4 mx-1"
              />
            }
            <label htmlFor="search-box" className="rounded-full">
              search
            </label>
            <input
              id="search-box"
              type="search"
              className="py-2 focus:outline-none px-2 flex-1 rounded-full w-full"
              placeholder="capenter"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              ref={searchRef}
              onKeyDown={handleSearch}
            />
          </div>
          <section className="py-4 px-2 grid grid-cols-2">
            {data && data.results.length != 0 ? (
              data.results.map((artist) => (
                <figure
                  key={artist.id}
                  className="flex m-2 w-12/12 border-5 border border-gray-400"
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
                      {artist.addresses[0]
                        ? artist.addresses[0].city
                        : 'Not available'}
                    </p>
                  </figcaption>
                </figure>
              ))
            ) : (
              <p className="text-center">No artisan found</p>
            )}
           
          </section>
          <div className='flex justify-end'>
          {data && data.results.length > 0 && (
              <Pagination
                numberOfRecords={data.count}
                handleFetch={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SearchArtisan;
