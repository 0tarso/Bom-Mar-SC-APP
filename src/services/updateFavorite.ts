import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoriteItem = {
  praia: string;
  complemento: string;
  favorite: boolean
};

export const updateFavorite = async (
  item: FavoriteItem
) => {

  if (!item) return;

  const itemId = item.praia + item.complemento;

  const stored = await AsyncStorage.getItem("@favBeachs");
  const favorites: FavoriteItem[] = stored ? JSON.parse(stored) : [];

  const alreadyExists = favorites.some(
    (fav) => fav.praia + fav.complemento === itemId
  );

  let updatedFavorites: FavoriteItem[];

  if (alreadyExists) {
    updatedFavorites = favorites.filter(
      (fav) => fav.praia + fav.complemento !== itemId
    );
    console.log("=======================")

    console.log("Removido dos favoritos");
  } else {
    updatedFavorites = [...favorites, {
      ...item,
      favorite: true
    }];
    console.log("=======================")

    console.log("Adicionado aos favoritos");
    console.log(updatedFavorites);
  }

  console.log(updatedFavorites)

  await AsyncStorage.setItem(
    "@favBeachs",
    JSON.stringify(updatedFavorites)
  );
}