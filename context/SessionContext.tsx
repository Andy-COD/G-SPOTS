import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { getAsyncValue } from "@/utils/helper";
import { useRouter } from "expo-router";
import { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  setUser: any;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithMobile: (phoneNumber: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const SessionContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const SessionProvider = ({ children }: any) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const loginWithEmail = async (email: string, password: string) => {
    await auth().signInWithEmailAndPassword(email, password);
  };

  const loginWithMobile = async (phoneNumber: string) => {
    await auth().signInWithPhoneNumber(phoneNumber);
  };

  const logout = () => {
    auth().signOut();
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    );
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  const isAuthenticated = !!user;

  if (initializing) return null;

  return (
    <SessionContext.Provider
      value={{ user, loginWithEmail, loginWithMobile, logout, isAuthenticated, setUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const getUserFromStorage = async () => {
  const isUserLoggedIn = await getAsyncValue("isUserLoggedIn");
  return isUserLoggedIn;
};
