import { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children, user }) => {
    console.log(user);
  const [loggedIn, setLoggedIn] = useState(user !== null);
  const [currentUser, setCurrentUser] = useState(user);

  return <UserContext.Provider value={{ loggedIn, setLoggedIn, currentUser, setCurrentUser }}>{children}</UserContext.Provider>
}