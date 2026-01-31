import { useEffect, useState, useCallback } from "react";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "toastify-react-native";

type UserLocation = {
  latitude: number;
  longitude: number;
  city: string;
  region?: string;
};

const STORAGE_KEY = "@user_location";

export function useLocation() {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const saveLocation = async (data: UserLocation) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const loadSavedLocation = async (): Promise<UserLocation | null> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const getLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Toast.error("Permissão de localização negada");
        setError("Permissão de localização negada");
        return;
      }

      const position =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const { latitude, longitude } = position.coords;

      const [address] =
        await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

      const city =
        address.city ||
        address.subregion ||
        address.region ||
        "Cidade desconhecida";

      const data: UserLocation = {
        latitude,
        longitude,
        city,
        region: address.region,
      };

      setLocation(data);
      await saveLocation(data);
    } catch (err: any) {
      setError(err.message || "Erro ao obter localização");
      Toast.error("Erro ao obter localização");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const savedLocation = await loadSavedLocation();

        if (savedLocation) {
          setLocation(savedLocation);
          setLoading(false);
          return; // 🚫 não liga o GPS
        }

        await getLocation();
      } catch {
        await getLocation();
      }
    })();
  }, [getLocation]);

  return {
    location,
    city: location?.city,
    region: location?.region,
    loading,
    error,
    refreshLocation: getLocation,
  };
}
