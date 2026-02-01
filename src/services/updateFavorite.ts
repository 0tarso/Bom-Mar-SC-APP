import AsyncStorage from "@react-native-async-storage/async-storage";
import { Beach } from "../types";


export const updateFavorite = async (
  item: Beach
) => {

  if (!item) return;


  const stored = await AsyncStorage.getItem("@favBeachs");
  const favorites: Beach[] = stored ? JSON.parse(stored) : [];

  const alreadyExists = favorites.some(
    (fav) => `${fav.latitude}${fav.longitude}` === `${item.latitude}${item.longitude}`
  );

  let updatedFavorites: Beach[];

  if (alreadyExists) {
    updatedFavorites = favorites.filter(
      (fav) => `${fav.latitude}${fav.longitude}` !== `${item.latitude}${item.longitude}`
    );

  } else {
    updatedFavorites = [...favorites, {
      ...item,
      favorite: true
    }];
    // console.log("=======================")

    // console.log("Adicionado aos favoritos");
    // console.log(updatedFavorites);
  }

  // console.log(updatedFavorites)

  await AsyncStorage.setItem(
    "@favBeachs",
    JSON.stringify(updatedFavorites)
  );
}