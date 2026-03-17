import React, { createContext, useContext, useEffect, useState } from "react";
import { getAppVersion } from "../services/getAppVersion";
import * as Application from 'expo-application'

export type AppVersionData = {
  latest: string | null;
  minimum: string | null;
  url: string
};

type AppVersionContextType = {
  versionData: AppVersionData;
  currentVersion: string
  isForceUpdate: boolean
  isOptionalUpdate: boolean
  loading: boolean;
  error: string | null;
  // refetch: () => Promise<void>;
};

const AppVersionContext = createContext<AppVersionContextType | undefined>(
  undefined
);

const compareVersions = (v1: string, v2: string) => {
  const a = v1.split(".").map(Number);
  const b = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const diff = (a[i] || 0) - (b[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
};

export const AppVersionProvider = ({ children }: { children: React.ReactNode; }) => {

  const [versionData, setVersionData] = useState<AppVersionData>({
    latest: null,
    minimum: null,
    url: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentVersion = Application.nativeApplicationVersion || '0.0.0'
  const [isForceUpdate, setIsForceUpdate] = useState(false);
  const [isOptionalUpdate, setIsOptionalUpdate] = useState(false);

  const fetchVersion = async () => {
    console.log('=========================================')
    console.log('current version >> ', currentVersion)
    try {
      setLoading(true);
      setError(null);

      const data = await getAppVersion()


      setVersionData({
        latest: data.latest,
        minimum: data.minimum,
        url: data.url
      });

      if (data.minimum && compareVersions(currentVersion, data.minimum) < 0) {
        setIsForceUpdate(true);
      }

      if (data.latest && compareVersions(currentVersion, data.latest) < 0) {
        setIsOptionalUpdate(true);
      }

    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
    console.log(versionData)
  };

  useEffect(() => {
    fetchVersion();
  }, []);

  return (
    <AppVersionContext.Provider
      value={{
        versionData,
        currentVersion,
        isForceUpdate,
        isOptionalUpdate,
        loading,
        error
      }}
    >
      {children}
    </AppVersionContext.Provider>
  );
};

export const useAppVersion = () => {
  const context = useContext(AppVersionContext);

  if (!context) {
    throw new Error(
      "useAppVersion deve ser usado dentro de um AppVersionProvider"
    );
  }

  return context;
};