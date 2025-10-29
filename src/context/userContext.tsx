import React, { createContext, useContext, useState, useEffect } from "react";

// 🧠 Define the type of user data (based on your student object)
export interface Student {
  name: string;
  gender: string | null;
  password: string;
  matno: string;
  status?: string;
}

// 🧠 Define the shape of the context
interface UserContextType {
  user: Student | null;
  login: (userData: Student) => void;
  logout: () => void;
}

// ⚙️ Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// ⚡ Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Student | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Save logged-in user
  const login = (userData: Student) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // persist login
  };

  // Logout and clear user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Restore user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 🪄 Custom hook for easy access
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
