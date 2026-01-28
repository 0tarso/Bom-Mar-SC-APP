import AsyncStorage from "@react-native-async-storage/async-storage"
import { mapBeachesByCity } from "../utils/mapPraiaCidade"
import { BeachLocalization } from "../types"

export const getAllFavorites = async () => {
  let filteredByCityData

  try {
    const beachs = await AsyncStorage.getItem("@favBeachs")


    const convertedJSON = JSON.parse(beachs)

    filteredByCityData = mapBeachesByCity(convertedJSON)

    console.log("Filtrados por cidade favoritos =======")
    console.log(filteredByCityData)
  } catch (error) {
    console.error("Erro ao buscar favoritos")
    console.error(error)
    throw error
  }


  return filteredByCityData as BeachLocalization[]
}