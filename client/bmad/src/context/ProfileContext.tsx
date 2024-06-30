import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthContext";
import Cookies from "js-cookie";

type ProviderProps = {
  children: ReactNode;
};

type BioType = {
  user_id: number;
  username: string;
  description: string;
};

type PassWordType = {
  password: string;
  confirmPassword: string;
};

type NewName = {
  firstName: string;
  lastName: string;
};

type ProfileContextType = {
  bio: BioType | null;
  email: string;
  setEmail: (e: any) => void;
  newName: NewName;
  setNewName: (e: any) => void;
  handleBioChanges: () => void;
  deleteAccount: (cb: () => void) => void;
  handlePasswordChange: (e: PassWordType) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileProvider = ({ children }: ProviderProps) => {
  const { user } = useAuthContext();
  const [bio, setBio] = useState<BioType | null>(null);
  const token = Cookies.get("token");

  const [newName, setNewName] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
  });
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setNewName({
        firstName: user.first_name,
        lastName: user.last_name,
      });
      setEmail(user.email || "");
    }
  }, [user]);

  const getBio = async () => {
    try {
      const response = await fetch(
        "https://lin-kash-server.vercel.app/addBio/getBio",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error fetching Bio");

      const data = await response.json();
      setBio(data);
    } catch (error) {
      console.error("Error fetching bio:", error);
    }
  };

  useEffect(() => {
    getBio();
  }, []);

  const handleBioChanges = async () => {
    const response = await fetch(
      "https://lin-kash-server.vercel.app/addBio/updateBio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          firstName: newName.firstName,
          lastName: newName.lastName,
          email,
        }),
      }
    );

    if (!response.ok) throw new Error("Error setting account");

    const data = await response.json();
    console.log(data);
  };

  const deleteAccount = async (callback: () => void) => {
    const response = await fetch(
      "https://lin-kash-server.vercel.app/addBio/deleteAccount",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    if (!response.ok) throw new Error("Error deleting account");

    const data = await response.json();
    console.log(data);
    callback();
    //navigate("/login");
  };

  const handlePasswordChange = (value: PassWordType) => {
    console.log(value);
  };

  return (
    <ProfileContext.Provider
      value={{
        bio,
        email,
        newName,
        setNewName,
        handleBioChanges,
        deleteAccount,
        setEmail,
        handlePasswordChange,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfileContext must be used within an ProfileProvider");
  }

  return context;
};

export { useProfileContext, ProfileProvider };
