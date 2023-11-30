import {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from "react";
import ArtisanClient from "../client/ArtisanClient";

const ApiContext = createContext(null);
export default function ApiProvider({ children }) {
  const onError = useCallback(() => {
    alert("An tunexpected error has occured, Please try again.");
  }, []);

  const api = useMemo(() => new ArtisanClient(onError));
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

export const useApi = () => {
  return useContext(ApiContext);
};
