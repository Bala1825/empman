
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("authUser")) || null;
    } catch {
      return null;
    }
  });

  function login(userDetails) {
    if (!userDetails || !userDetails.email || !userDetails.token) {
      throw new Error("Invalid login response.");
    }
  
    const loggedInUser = {
      id: userDetails.id,
      name: userDetails.name,
      email: userDetails.email,
      designation: userDetails.designation,
      token: userDetails.token
    };
  
    localStorage.setItem(
      "authUser",
      JSON.stringify(loggedInUser)
    );
  
    setUser(loggedInUser);
  }

  function logout() {
    localStorage.removeItem("authUser");
    setUser(null);
  }

  const isManager =
    user?.designation?.trim().toLowerCase() === "manager";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isManager
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
