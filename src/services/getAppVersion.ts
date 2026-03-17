import api from "../api/api"
import { AppVersionData } from "../contexts/AppVersionProvider"
export const getAppVersion = async () => {
  try {
    const response = await api.get("/app/versao")

    const data = response.data

    if (!data) {
      return
    }

    return data as AppVersionData
  } catch (error) {
    console.error("Erro ao buscar appVersion", error)
    throw error
  }
}