import { createContext, useContext, useReducer, useEffect } from "react";
import userReducer from "./userReducer";
import { getUserData } from "../../Services/user.service";
import { isLoggedInLocaly } from "../../Utils";
export const UserContext = createContext();
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, {
    isLoggedIn: isLoggedInLocaly(),
    name: "",
    liked: [],
    watchlater: [],
    history: [],
    playlist: []
  });

  useEffect(() => {
    (async function () {
      if (userState.isLoggedIn) {
        const response = await getUserData();
        if (response.success) {
          userDispatch({
            type: "UPDATE_USER_DATA",
            payload: {
              user: response.user,
              playlist: response.playlist
            }
          });
        } else if (response.status === 401) {
          userDispatch({
            type: "UPDATE_USER_LOGIN",
            payload: {
              isLoggedIn: false
            }
          });
        }
      } else {
      }
    })();
  }, [userState.isLoggedIn]);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
}
