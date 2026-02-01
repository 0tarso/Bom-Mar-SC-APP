import api from "../api/api"

export const getWeather = async (
  latitude: number, longitude: number
) => {

  let response

  try {
    response =
      await api.get(`/clima?lat=${latitude}&lon=${longitude}`)
  } catch (error) {
    throw error
  }

  return response.data
}