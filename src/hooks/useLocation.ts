import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

type UserLocation = {
  latitude: number;
  longitude: number;
  city: string;
  region?: string;
  updated_at: string;
};

const STORAGE_KEY = "@user_location";

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Salva no AsyncStorage
  const saveLocation = async (data: UserLocation) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { }
  };

  // Carrega a localização salva
  const loadSavedLocation = async (): Promise<UserLocation | null> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // Obtém localização atual
  const getLocationOnce = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.error("Permissão de localização negada");
        setError("Permissão de localização negada");
        return null;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = position.coords;
      const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

      const city = address.city || address.subregion || address.region || "Cidade desconhecida";

      const data: UserLocation = {
        latitude,
        longitude,
        city,
        region: address.region,
        updated_at: new Date().toISOString(),
      };

      setLocation(data);
      await saveLocation(data);

      return data;
    } catch (err: any) {
      setError(err.message || "Erro ao obter localização");
      Toast.error("Erro ao obter localização");
      return null;
    }
  }, []);

  // Atualização contínua
  useEffect(() => {
    let subscription: Location.LocationSubscription;

    (async () => {
      const saved = await loadSavedLocation();
      if (saved) setLocation(saved); // mostra imediatamente a última localização

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        setError("Permissão de localização negada");
        return;
      }

      // Pega posição inicial
      await getLocationOnce();

      // Observa mudanças de posição
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 2 },
        async (position) => {
          const { latitude, longitude } = position.coords;
          const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });

          const city = address.city || address.subregion || address.region || "Cidade desconhecida";

          const data: UserLocation = {
            latitude,
            longitude,
            city,
            region: address.region,
            updated_at: new Date().toISOString(),
          };

          setLocation(data);
          await saveLocation(data);
        }
      );

      setLoading(false);
    })();

    return () => {
      subscription?.remove();
    };
  }, [getLocationOnce]);

  return {
    location,
    city: location?.city,
    region: location?.region,
    loading,
    error,
    refreshLocation: getLocationOnce,
  };
}
