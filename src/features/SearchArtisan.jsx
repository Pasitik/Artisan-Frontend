import { useEffect, useRef, useState } from 'react';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchArtisan } from './SearchArtisanSlice';
import { useApi } from '../data/ApiProvider';
import Pagination from '../components/Pagination';
import SearchFilters from './SearchFilters';
import { Link } from 'react-router-dom';
import Artisan from '../components/Artisan';
import Loader from '../components/Loader';

const SearchArtisan = () => {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const api = useApi();
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParamsTracker, setSearchParamsTracker] = useState({
    title: '',
    state: '',
    city: '',
    street: '',
  });
  const { status, data, error } = useSelector((state) => state.artisans);

  useEffect(() => {
    dispatch(
      fetchArtisan(async () => await api.fetchArtisansPerPage(currentPage)),
    ).then(() => searchRef.current.focus());
  }, [currentPage, dispatch, api]);

  useEffect(() => {
    searchRef.current.focus();
    const keyValuePairs = Object.entries(searchParamsTracker);

    const keyValueString = keyValuePairs
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    if (keyValueString.length > 'title=&state=&city=&street='.length) {
      dispatch(
        fetchArtisan(async () => api.searchArtisan(keyValueString)),
      ).then(() => {
        searchRef.current.focus();
      });
    }
  }, [searchParamsTracker, dispatch, api]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchItem(searchValue);

    if (e.key === 'Enter' && searchValue.trim() !== '') {
      dispatch(
        fetchArtisan(
          async () => await api.searchArtisan(`title=${searchValue}`),
        ),
      ).then(() => {
        searchRef.current.focus();
        setSearchParamsTracker({ ...searchParamsTracker, title: searchValue });
      });
      setCurrentPage(1);
    } else if (searchValue.trim() === '' && e.type == 'change') {
      dispatch(
        fetchArtisan(async () => await api.fetchArtisansPerPage(currentPage)),
      ).then(() => {
        searchRef.current.focus();
        setSearchParamsTracker({ ...searchParamsTracker, title: '' });
      });
    }
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <main className=" h-screen w-screen">
      <NavBar />
      <div className="h-full bg-gray-50 flex flex-col md:flex-row">
        <SearchFilters
          setSearchParamsTracker={setSearchParamsTracker}
          searchParamsTracker={searchParamsTracker}
        />
        <section className="search-section w-full h-screen">
          <h1 className="text-3xl font-bold text-center text-black-600 my-3 pt-4">
            Find an artisan near you!{' '}
          </h1>

          <div className="w-[100%] flex items-center ml-4 border-2 border-black rounded-full bg-white md:w-[450px] overflow-hidden">
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
              className="py-2 focus:outline-none px-2 flex-1 rounded-full w-full sm:w-[100px]"
              placeholder="capenter"
              value={searchItem}
              onChange={(e) => {
                handleSearch(e);
                // setSearchItem(e.target.value)
              }}
              ref={searchRef}
              onKeyDown={handleSearch}
            />
          </div>
          <section className="py-4 px-2 grid md:grid-cols-1 lg:grid-cols-2">
            {data && data.results.length != 0 ? (
              data.results.map((artist) => (
                <Link
                  to={`/artisan/${artist.id}`}
                  key={artist.id}
                  className={'m-2 p-0 border-5 border border-gray-400'}
                >
                  <Artisan artist={artist} />
                </Link>
              ))
            ) : (
              <p className="text-center">No artisan found</p>
            )}
          </section>
          <div className="flex justify-end">
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
