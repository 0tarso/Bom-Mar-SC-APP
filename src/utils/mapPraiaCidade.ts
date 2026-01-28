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
    return acc;
  },
  {} as Record<string, string>
);



export const mapBeachesByCity = (
  data: Beach[]
): BeachLocalization => {
  return data.reduce((acc, item) => {
    const city =
      mapBeachByCity[item.praia] ?? "Outros";

    if (!acc[city]) {
      acc[city] = [];
    }

    acc[city].push(item);

    return acc;
  }, {} as BeachLocalization);
};