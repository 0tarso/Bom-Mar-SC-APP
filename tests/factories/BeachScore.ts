import { BeachScoreProps } from "@/src/components/BeachScore"

export function makeBeachScore(
  overrides: Partial<BeachScoreProps> = {}
): BeachScoreProps {
  const base: BeachScoreProps = {
    score: {
      adulto: { score: 7, label: "Bom" },
      crianca: { score: 6, label: "Atenção" },
      surf: { score: 8, label: "Bom" },
    },
    situacao: "PRÓPRIA",
    resultado_e_coli: "250",
    ultima_analise: "2026-03-31",
  }

  return {
    ...base,
    ...overrides,
    score: {
      ...base.score,
      ...overrides.score,
      adulto: {
        ...base.score.adulto,
        ...overrides.score?.adulto,
      },
      crianca: {
        ...base.score.crianca,
        ...overrides.score?.crianca,
      },
      surf: {
        ...base.score.surf,
        ...overrides.score?.surf,
      },
    },
  }
}

export function makeBeachScoreImpropia() {
  return makeBeachScore({
    situacao: "IMPRÓPRIA",
    resultado_e_coli: "3600",
    score: {
      adulto: { score: 2, label: "Não recomendado" },
      crianca: { score: 1, label: "Não recomendado" },
      surf: { score: 2, label: "Fraco" },
    },
  })
}