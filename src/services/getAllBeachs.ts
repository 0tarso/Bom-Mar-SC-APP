import api from "../api/api"

export const getAllBeachs = async () => {
  try {
    const response = await api.get("/balneabilidade")

    const dados = response.data.dados

    if (!dados) {
      return
    }

    return dados
  } catch (error) {
    console.error("Erro ao buscar praias", error)
    throw error
  }
}