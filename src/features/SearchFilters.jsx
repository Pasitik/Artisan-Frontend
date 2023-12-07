import { useEffect, useState } from 'react';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from './filterSlice';

const SearchFilters = ({ searchParamsTracker, setSearchParamsTracker }) => {
  const api = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocation(async () => await api.fetchStates()));
  }, [api, dispatch]);

  const { status, data, error } = useSelector((state) => state.states);

  const handleLocation = (option) => {
    // setLocationFilter(option.target.value);
    setSearchParamsTracker({
      ...searchParamsTracker,
      [option.target.name]: option.target.value,
    });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <section className="filters-section h-screen bg-gray-200 w-2/12 grid place-content-center">
      <h2>Filter By:</h2>
      <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        <button>Job title</button>
      </div>
      <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        <button>Location</button>
        <div>
          <select
            name="state"
            className="block w-full"
            onChange={handleLocation}
            value={searchParamsTracker.state}
          >
            <option value="" disabled>
              -- Select --
            </option>
            {data.states &&
              data.states.map((opts) => (
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
      <div className="w-[180px] border boder-1 border-gray-600 max-w-[180px] grid place-content-center p-1 my-4">
        Experience<button></button>
      </div>
    </section>
  );
};

export default SearchFilters;
