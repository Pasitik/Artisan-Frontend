import { useEffect } from 'react';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getStates } from './stateSlice';
import { getCities } from './citySlice';
import { getStreets } from './streetSlice';
import Loader from '../components/Loader';

const SearchFilters = ({ searchParamsTracker, setSearchParamsTracker }) => {
  const api = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates(async () => await api.fetchStates()));

    if (searchParamsTracker.state.trim() !== '') {
      dispatch(getCities(async () => await api.fetchCities()));
    }

    if (searchParamsTracker.city.trim() !== '') {
      dispatch(getStreets(async () => await api.fetchStreets()));
    }
  }, [api, dispatch, searchParamsTracker]);

  const { status, states, error } = useSelector((state) => state.states);
  const { cities } = useSelector((state) => state.cities);
  const { streets } = useSelector((state) => state.streets);

  const handleLocation = (option) => {
    setSearchParamsTracker({
      ...searchParamsTracker,
      [option.target.name]: option.target.value,
    });
  };

  if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <section className="filters-section h-screen bg-gray-200 lg:w-2/12 grid place-content-center md:w-4/12">
      <h2 className="font-bold text-xl">Filter By:</h2>
      {/* <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        <button>Job title</button>
      </div> */}
      <h2 className="text-center mt-4">Location</h2>
      <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1">
        <div className="my-2">
          <select
            name="state"
            className="block w-full"
            onChange={handleLocation}
            value={searchParamsTracker.state}
          >
            <option value="" disabled>
              -- State/Province --
            </option>
            {states &&
              states.map((opts) => (
                <option key={opts} value={opts}>
                  {opts}
                </option>
              ))}
          </select>
        </div>
        <div className="my-2">
          <select
            name="city"
            className="block w-full"
            onChange={handleLocation}
            value={searchParamsTracker.city}
          >
            <option value="" disabled>
              -- City --
            </option>
            {cities &&
              cities.map((opts) => (
                <option key={opts} value={opts}>
                  {opts}
                </option>
              ))}
          </select>
        </div>
        <div className="my-2">
          <select
            name="street"
            className="block w-full"
            onChange={handleLocation}
            value={searchParamsTracker.street}
          >
            <option value="" disabled>
              -- Street --
            </option>
            {streets &&
              streets.map((opts) => (
                <option key={opts} value={opts}>
                  {opts}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        <button>Ratings</button>
      </div>
      {/* <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        Experience<button></button>
      </div> */}
    </section>
  );
};

export default SearchFilters;
