import beachByCity from "../data/praia_por_cidade.json"
import { Beach, BeachLocalization } from "../types";


const normalize = (text: string) =>
  text
    .normalize("NFD")               // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

const mapBeachByCity = beachByCity.reduce(
  (acc, item) => {
    acc[normalize(item.praia)] = item.cidade;
    // console.log(`Mapping beach "${item.praia}" to city "${item.cidade}"`);
    return acc;
  },
  {} as Record<string, string>
);



export const mapBeachesByCity = (
  data: Beach[]
): BeachLocalization => {
  return data.reduce((acc, item) => {

    const normalizedBeachName = normalize(item.praia);
    const city =
      mapBeachByCity[normalizedBeachName] ?? "Outros";

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(item);

    // console.log(`Assigned beach "${item.praia}" to city "${city}"`);
    return acc;
  }, {} as BeachLocalization);
};