/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext } from 'react';
import ArtisanClient from '../client/ArtisanClient';

const ApiContext = createContext(null);
export default function ApiProvider({ children }) {
  const onError = useCallback(() => {
    alert('An unexpected error has occured, Please try again.');
  }, []);

  const api = new ArtisanClient(onError);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  return useContext(ApiContext);
};
