import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

type InternetContextType = {
  isConnected: boolean | null;
};

const InternetContext = createContext<InternetContextType>({
  isConnected: null,
});

export const InternetProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    console.log('isConnected')
    console.log(isConnected)
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = state.isConnected && state.isInternetReachable;
      setIsConnected(!!online);
    });

    return () => unsubscribe();
  }, []);

  return (
    <InternetContext.Provider value={{ isConnected }}>
      {children}
    </InternetContext.Provider>
  );
};

export const useInternet = () => useContext(InternetContext);