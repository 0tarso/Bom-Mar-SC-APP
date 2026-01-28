import api from "@/src/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage"

type FavoriteItem = {
  praia: string;
  complemento: string;
};

export const filterData = (
  rawData: Record<string, any[]>,
  setFilter: (any) => void,
  category?: string,
) => {

  if (!rawData) {
    setFilter(null)
    return;
  }

  const sections = Object.entries(rawData)
    .map(([cidade, praias]) => ({
      title: cidade,
      data: praias.filter(
        (praia) => {
          if (category) {
            return praia.situacao === category
          }
          else {
            return praia
          }
        }
      ),
    }))
    .filter((section) => section.data.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));


  setFilter(sections);
  return




}

