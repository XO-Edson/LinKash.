import { ReactNode, createContext, useState, useContext } from "react";

type ProviderProps = {
  children: ReactNode;
};

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthContextType = {
  email: string;
  password: string;
  user: UserInfo | null;
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>("");
  const [user, setUser] = useState<UserInfo | null>(null);

  const login = async (email: string, password: string) => {
    const reqBody = { email, password };

    try {
      const response = await fetch("http://localhost:4700/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) throw new Error("Error logging in");

      const data = await response.json();

      console.log("Login Successful");

      const { token, user: userData } = data;

      setUser(userData);
      setToken(token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        user,
        token,
        login,
        logout,
        setEmail,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* CUSTOM CONTEXT HOOK */
function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export { useAuthContext, AuthProvider };
