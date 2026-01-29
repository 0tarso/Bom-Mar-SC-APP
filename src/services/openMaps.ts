import { Linking } from "react-native";

export function openRouteWithCoords(
  originLat: number,
  originLng: number,
  destination: string
) {
  const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${encodeURIComponent(destination)}`;
  Linking.openURL(url);
}
