import praiaPorCidade from "../data/praia_por_cidade.json"

type PraiaItem = {
  praia: string;
  local: string;
  complemento: string;
  data_coleta: string;
  situacao: string;
};


const normalize = (text: string) =>
  text
    .normalize("NFD")               // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .trim();

const praiaToCidadeMap = praiaPorCidade.reduce(
  (acc, item) => {
    acc[normalize(item.praia)] = item.cidade;
    return acc;
  },
  {} as Record<string, string>
);


type PraiasPorCidade = Record<string, PraiaItem[]>;

export const mapPraiasPorCidade = (
  data: PraiaItem[]
): PraiasPorCidade => {
  return data.reduce((acc, item) => {
    const cidade =
      praiaToCidadeMap[item.praia] ?? "Outros";

    if (!acc[cidade]) {
      acc[cidade] = [];
    }

    acc[cidade].push(item);

    return acc;
  }, {} as PraiasPorCidade);
};