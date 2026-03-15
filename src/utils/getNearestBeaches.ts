// utils/getNearestBeaches.ts
import { BeachLocalization, Beach } from "../types/index";

export function getDistanceKm(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export type BeachSection = {
  title: string;
  data: Beach[];
};

export function getNearestBeaches(
  beachLocalization: BeachLocalization,
  userLat: number,
  userLon: number,
  radiusKm = 50,
  maxResults = 20
): BeachLocalization[] {
  type BeachWithDistance = Beach & { _distanceKm: number };

  const allBeaches: (BeachWithDistance & { city: string })[] = [];

  for (const [city, beaches] of Object.entries(beachLocalization)) {
    for (const beach of beaches) {
      const lat = parseFloat(beach.latitude);
      const lon = parseFloat(beach.longitude);

      if (isNaN(lat) || isNaN(lon)) continue;

      const distance = getDistanceKm(userLat, userLon, lat, lon);

      if (distance <= radiusKm) {
        allBeaches.push({ ...beach, city, _distanceKm: distance });
      }
    }
  }

  allBeaches.sort((a, b) => a._distanceKm - b._distanceKm);

  const sorted = allBeaches
    .slice(0, maxResults)
    .map(({ city, _distanceKm, ...beach }) => beach);

  return [{
    //@ts-expect-error
    title: `Raio de ${radiusKm}km`,
    data: sorted
  }];
}