import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  userName : null,
  ban : null,
  teamId : null,
  isAdmin : false,
  profileImage: null,
  login: () => {},
  logout: () => {},
  updateProfilePicture: () => {},
  updateUsername: () => {},
});
