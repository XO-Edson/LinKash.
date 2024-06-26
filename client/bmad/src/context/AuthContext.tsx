import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import Cookies from "js-cookie";

type ProviderProps = {
  children: ReactNode;
};

export type UserInfo = {
  email: string;
  first_name: string;
  last_name: string;
};

type BioData = {
  username: string;
  description: any;
};

export type RegistrationType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AuthContextType = {
  email: string;
  password: string;
  user: UserInfo | null;
  token: string | null;
  login: (email: string, password: string, cb: () => void) => void;
  logout: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  registeredUser: RegistrationType | null;
  setRegisteredUser: (e: RegistrationType) => void;
  register: (e: RegistrationType, callBack: () => void) => void;
  bio: BioData | undefined;
  setBio: (e: any) => void;
  handleBio: (e: any, cb: () => void) => void;
  isNewUser: boolean;
  shortcode: number | null;
  setShortcode: (e: any) => void;
  handleAccount: (e: any, cb: () => void) => void;
  menu: boolean;
  setMenu: (e: any) => void;
  toggleMenu: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: ProviderProps) => {
  const [registeredUser, setRegisteredUser] = useState<RegistrationType | null>(
    null
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [bio, setBio] = useState<BioData>({
    username: "",
    description: "",
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const [shortcode, setShortcode] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    // Check if storedUser is not null before parsing
    if (storedUser) {
      // Parse the stored JSON string back into an object and cast it to UserInfo
      const parsedUser: UserInfo = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  const handleBio = async (bio: BioData, callBack: () => void) => {
    const { username, description } = bio;
    if (!username || !description) return new Error("Username required");

    try {
      const response = await fetch(
        "https://lin-kash-server.vercel.app/addBio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username, description }),
        }
      );

      if (!response.ok) throw new Error("Error registering");

      const data = await response.json();
      setBio(data);

      console.log("Bio added");
      callBack();
    } catch (error) {
      console.error(error, "Username failed");
    }
  };

  const register = async (userInfo: RegistrationType, callBack: () => void) => {
    const reqBody = userInfo;

    try {
      const response = await fetch(
        "https://lin-kash-server.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!response.ok) throw new Error("Error registering");

      const data = await response.json();

      console.log("Registration Successful");

      setRegisteredUser(data);
      sessionStorage.setItem("isNewUser", "true");
      callBack();
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const login = async (
    email: string,
    password: string,
    callBack: () => void
  ) => {
    const reqBody = { email, password };

    try {
      const response = await fetch("https://lin-kash-server.vercel.app/login", {
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

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setToken(token);

      Cookies.set("token", token);

      /* SESSION STORAGE TO CHECK FOR NEW USER */
      const newUser = sessionStorage.getItem("isNewUser") === "true";

      setIsNewUser(newUser);

      if (newUser) {
        sessionStorage.removeItem("isNewUser");
      }

      /* REDIRECT TO BIO PAGE */
      callBack();
      return;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleAccount = async (account: number, callBack: () => void) => {
    const shortcode = account;

    if (!shortcode) throw Error("Account missing");

    try {
      const response = await fetch(
        "https://lin-kash-server.vercel.app/accountDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify({ shortcode }),
        }
      );

      if (!response.ok) throw new Error("Error setting account");
      const data = await response.json();
      console.log(data);

      setShortcode(data);
      setIsNewUser(false);
      callBack();
    } catch (error) {
      console.error("Account set-up failed", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    Cookies.remove("token");
    console.log("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        user,
        token,
        register,
        login,
        logout,
        setEmail,
        setPassword,
        registeredUser,
        setRegisteredUser,
        bio,
        setBio,
        handleBio,
        isNewUser,
        shortcode,
        setShortcode,
        handleAccount,
        menu,
        toggleMenu,
        loading,
        setMenu,
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
