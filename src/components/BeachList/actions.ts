import { BeachLocalization } from "@/src/types";

export const filterData = (
  rawData: BeachLocalization,
  setFilter: (any) => void,
  situation?: string,
) => {

  if (!rawData) {
    setFilter(null)
    return;
  }

  const sections = Object.entries(rawData)
    .map(([city, beaches]) => ({
      title: city,
      data: beaches.filter(
        (beach) => {
          if (situation) {
            return beach.situacao === situation
          }
          else {
            return beach
          }
        }
      ),
    }))
    .filter((section) => section.data.length > 0)
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

  setFilter(sections);
  return
}

