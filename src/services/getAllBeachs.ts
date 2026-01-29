import api from "../api/api"
import { BeachLocalization } from "../types"

export const getAllBeachs = async () => {
  try {
    const response = await api.get("/balneabilidade")

    const dados = response.data.dados

    if (!dados) {
      return
    }

    return dados as BeachLocalization[]
  } catch (error) {
    // console.error("Erro ao buscar praias", error)
    throw error
  }
}