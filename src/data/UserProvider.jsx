import { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from './ApiProvider';

const UserContext = createContext(null);
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
        if (api.isAuthenticated()) {
        const result = await api.fetchCustomer();

        if (result.username) {
          setUser(result);
        }
      }
    };

    fetchData();
  }, [api, setUser]);

  const login = async (username, password) => {
    const res = await api.loginUser(username, password);
    if (res.access) {
      const result = await api.fetchCustomer();
      if (result.username) {
        setUser(result);
      }
    }

    return res;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
/* eslint-disable react-refresh/only-export-components */
export const useUser = () => {
  return useContext(UserContext);
};
