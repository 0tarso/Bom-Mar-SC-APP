import api from "../api/api";
import { Beach } from "../types";

export const getTripDistance = async (
  beach: Beach,
  location: {
    latitude: number,
    longitude: number
  }
) => {
  let response

  try {
    response =
      await api.get(`/distancia?de_lat=${location.latitude}&de_lng=${location.longitude}&para_lat=${beach.latitude}&para_lng=${beach.longitude}`);

  } catch (error) {
    throw error
  }

  return response.data.data.distancia_em_km
}