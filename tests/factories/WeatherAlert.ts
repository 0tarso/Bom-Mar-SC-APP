// tests/factories/weatherAlert.ts
import { WeatherAlert } from "@/src/types";

export function makeWeatherAlert(overrides: Partial<WeatherAlert> = {}): WeatherAlert {
  return {
    id: 1,
    codigo: "AL-001",
    data_inicio: "2024-01-15",
    hora_inicio: "08:00",
    data_fim: "2024-01-16",
    hora_fim: "18:00",
    descricao: "Chuvas intensas",
    severidade: "Alta",
    aviso_cor: "#FF0000",
    riscos: ["Alagamentos", "Deslizamentos"],
    instrucoes: ["Evite áreas de risco", "Fique em local seguro"],
    estados: "SC",
    regioes: "Sul",
    mesorregioes: "Grande Florianópolis",
    inicio: "2024-01-15T08:00:00Z",
    fim: "2024-01-16T18:00:00Z",
    ...overrides,
  };
}