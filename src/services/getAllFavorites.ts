import AsyncStorage from "@react-native-async-storage/async-storage"
import { mapPraiasPorCidade } from "../utils/mapPraiaCidade"

export const getAllFavorites = async () => {
  let filteredByCityData

  try {
    const beachs = await AsyncStorage.getItem("@favBeachs")


    const convertedJSON = JSON.parse(beachs)

    filteredByCityData = mapPraiasPorCidade(convertedJSON)

    console.log(filteredByCityData)
  } catch (error) {
    console.error("Erro ao buscar favoritos")
    console.error(error)
    throw error
  }


  return filteredByCityData
}