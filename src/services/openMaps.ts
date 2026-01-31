import { Linking } from "react-native";

export function openRouteWithCoords(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
) {

  let url = ''

  if (!originLat || !originLng) {
    url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;
    Linking.openURL(url);
    return
  }

  url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;

  Linking.openURL(url);
}