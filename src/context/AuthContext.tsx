import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  mobile: string;
};

type AuthContextType = {
  user: User | null;

  login: (mobile: string, password: string) => void;

  register: (name: string, mobile: string, password: string) => void;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 🔥 LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("vsp_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔥 LOGIN
  const login = (mobile: string, password: string) => {
    const fakeUser = {
      name: "Vignesh",
      mobile,
    };

    localStorage.setItem("vsp_user", JSON.stringify(fakeUser));

    setUser(fakeUser);
  };

  // 🔥 REGISTER
  const register = (name: string, mobile: string, password: string) => {
    const fakeUser = {
      name,
      mobile,
    };

    localStorage.setItem("vsp_user", JSON.stringify(fakeUser));

    setUser(fakeUser);
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("vsp_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
