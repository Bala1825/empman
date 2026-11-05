 
import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {


  const savedUser = localStorage.getItem("demoUser");

  const [user, setUser] = useState(
    savedUser ? JSON.parse(savedUser) : null
  );


  function login(email) {
    const userDetails = { email: email };

    localStorage.setItem(
      "demoUser",
      JSON.stringify(userDetails)
    );

    setUser(userDetails);
  }


  function logout() {
    localStorage.removeItem("demoUser");
    setUser(null);
  }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
