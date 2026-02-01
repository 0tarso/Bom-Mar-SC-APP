export type BeachSituation = "PRÓPRIA" | "IMPRÓPRIA"

export type Beach = {
  complemento: string,
  data_coleta: string,
  favorite?: boolean,
  local: string,
  praia: string,
  situacao: BeachSituation,
  latitude: string,
  longitude: string
}

export type BeachLocalization = {
  [city: string]: Beach[]
}

export type Weather = {
  localizacao: {
    lat: number;
    lon: number;
  };

  atual: {
    temperatura: number;
    sensacao: number;
    umidade: number;
    pressao: number;

    vento: {
      velocidade_kmh: number;
      direcao_graus: number;
      label: "Idefinido" | "Vento calmo" | "Vento fraco" | "Vento moderado" | "Vento forte";
    };

    chuva: {
      mm_1h: number;
      label: "Sem chuva" | "Chuva fraca" | "Chuva moderada" | "Chuva forte";
    };

    nuvens: {
      percentual: number;
      label: "Indefinido" | "Céu limpo" | "Poucas nuvens" | "Nublado" | "Encoberto";
    };

    clima: {
      principal: string;
      descricao: string;
      icone: string;
    };

    sol: {
      nascer: {
        hora: string;
      };
      por: {
        hora: string;
      };
    };

    "localização": string;
    atualizado_em: string;
  };
};