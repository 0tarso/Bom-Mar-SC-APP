// tests/factories/beach.ts
import { Beach, BeachLocalization } from "../../src/types/index";

function makePeriodo() {
  return {
    waveHeight_avg: 1.0,
    wavePeriod_avg: 10,
    waterTemperature_avg: 24,
    swellHeight_avg: 0.8,
    swellPeriod_avg: 9,
    windSpeed_avg: 15,
    currentSpeed_avg: 0.5,
    rain_avg: 0,
    precipitation_avg: 0,
    visibility_avg: 10,
  };
}

export function makeBeach(overrides: Partial<Beach> = {}): Beach {
  return {
    complemento: "",
    data_coleta: "2024-01-01",
    local: "Praia Teste",
    praia: "Praia Teste",
    situacao: "PRÓPRIA",
    resultado_e_coli: "0",
    latitude: "-27.5954",
    longitude: "-48.548",
    favorite: false,
    zona_marina_id: "zona-1",
    score_de_banho: {
      adulto: { score: 80, label: "Bom" },
      crianca: { score: 75, label: "Bom" },
      surf: { score: 60, label: "Regular" },
    },
    previsao_marinha: {
      atualizado_em: "2024-01-01T00:00:00Z",
      diario: {
        manha: makePeriodo(),
        tarde: makePeriodo(),
        noite: makePeriodo(),
      },
    },
    ...overrides,
  };
}

export function makeBeachLocalization(
  overrides: Partial<BeachLocalization> = {}
): BeachLocalization {
  return {
    florianopolis: [makeBeach()],
    ...overrides,
  };
}