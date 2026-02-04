
export type BeachSituation = "PRÓPRIA" | "IMPRÓPRIA"


export type LabelBanho =
  | "Não recomendado"
  | "Atenção"
  | "Bom"
  | "Excelente";

export type LabelSurf =
  | "Fraco"
  | "Regular"
  | "Bom"
  | "Clássico";

export type ScorePerfil<TLabel extends string> = {
  score: number;
  label: TLabel;
};

export type Beach = {
  complemento: string;
  data_coleta: string;
  favorite?: boolean;
  local: string;
  praia: string;
  situacao: "PRÓPRIA" | "IMPRÓPRIA";
  latitude: string;
  longitude: string;

  score_de_banho: {
    adulto: {
      score: number;
      label: "Não recomendado" | "Atenção" | "Bom" | "Excelente";
    };
    crianca: {
      score: number;
      label: "Não recomendado" | "Atenção" | "Bom" | "Excelente";
    };
    surf: {
      score: number;
      label: "Fraco" | "Regular" | "Bom" | "Clássico";
    };
  };

  zona_marina_id: string;

  previsao_marinha: {
    atualizado_em: string;
    diario: {
      manha: {
        waveHeight_avg: number;
        wavePeriod_avg: number;
        waterTemperature_avg: number;
      };
      tarde: {
        waveHeight_avg: number;
        wavePeriod_avg: number;
        waterTemperature_avg: number;
      };
      noite: {
        waveHeight_avg: number;
        wavePeriod_avg: number;
        waterTemperature_avg: number;
      };
    };
  };
};

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