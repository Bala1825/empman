
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // Get registered employees from localStorage
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("demoUsers")) || [];
    } catch {
      return [];
    }
  });

  // Get currently logged-in user
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("demoUser")) || null;
    } catch {
      return null;
    }
  });

  // Registration
  function register(name, email, password, designation) {

    const existingUser = users.find(
      (item) => item.email === email.toLowerCase()
    );

    if (existingUser) {
      return "This email is already registered.";
    }

    const newUser = {
      id: Date.now(),
      name: name,
      email: email.toLowerCase(),
      password: password,
      designation: designation,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "demoUsers",
      JSON.stringify(updatedUsers)
    );

    setUsers(updatedUsers);

    return "";
  }

  // Login
  function login(email, password) {

    // Existing static login credential
    const isStaticUser =
      email === "admin@example.com" &&
      password === "Admin123!";

    if (isStaticUser) {
      const userDetails = {
        name: "Admin",
        email: "admin@example.com",
        designation: "Manager",
      };

      localStorage.setItem(
        "demoUser",
        JSON.stringify(userDetails)
      );

      setUser(userDetails);

      return true;
    }

    // Check registered employees
    const foundUser = users.find(
      (item) =>
        item.email === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return false;
    }

    const userDetails = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      designation: foundUser.designation,
    };

    localStorage.setItem(
      "demoUser",
      JSON.stringify(userDetails)
    );

    setUser(userDetails);

    return true;
  }

  // Logout
  function logout() {
    localStorage.removeItem("demoUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
