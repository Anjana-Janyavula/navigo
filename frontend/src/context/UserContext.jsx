import {
  createContext,
  useContext,
  useState
} from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return (
        JSON.parse(
          sessionStorage.getItem("navigo_user")
        ) || null
      );
    } catch {
      return null;
    }
  });

  const saveUser = (value) => {
    setUser(value);

    sessionStorage.setItem(
      "navigo_user",
      JSON.stringify(value)
    );
  };

  const clearUser = () => {
    setUser(null);
    sessionStorage.removeItem("navigo_user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUser,
        clearUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () =>
  useContext(UserContext);