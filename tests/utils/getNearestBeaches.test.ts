// tests/utils/getNearestBeaches.test.ts
import { getDistanceKm, getNearestBeaches } from "@/src/utils/getNearestBeaches";
import { BeachLocalization } from "@/src/types";
import { makeBeach } from "../factories";

// ─── Fixtures ─────────────────────────────────────────────────────────────────
const USER_LAT = -27.5954;
const USER_LON = -48.548;

const MOCK_LOCALIZATION: BeachLocalization = {
  florianopolis: [
    makeBeach({ praia: "Praia dos Ingleses", latitude: "-27.4385", longitude: "-48.3917" }),
    makeBeach({ praia: "Praia Fantasma", latitude: "invalido", longitude: "também" }),
  ],
  balneario: [
    makeBeach({ praia: "Praia Central", latitude: "-26.9906", longitude: "-48.6348" }),
  ],
};

// ─── getDistanceKm ────────────────────────────────────────────────────────────
describe("getDistanceKm", () => {
  it("retorna 0 quando os dois pontos são idênticos", () => {
    expect(getDistanceKm(USER_LAT, USER_LON, USER_LAT, USER_LON)).toBe(0);
  });

  it("calcula distância aproximada entre Floripa e Balneário (~68 km)", () => {
    const distance = getDistanceKm(USER_LAT, USER_LON, -26.9906, -48.6348);
    expect(distance).toBeGreaterThan(63);
    expect(distance).toBeLessThan(73);
  });

  it("é simétrica: distância A→B igual a B→A", () => {
    const ab = getDistanceKm(USER_LAT, USER_LON, -26.9906, -48.6348);
    const ba = getDistanceKm(-26.9906, -48.6348, USER_LAT, USER_LON);
    expect(ab).toBeCloseTo(ba, 5);
  });

  it("retorna valor positivo para dois pontos distintos", () => {
    expect(getDistanceKm(0, 0, 1, 1)).toBeGreaterThan(0);
  });
});

// ─── getNearestBeaches ────────────────────────────────────────────────────────
describe("getNearestBeaches", () => {
  it("retorna sempre um array com exatamente 1 seção", () => {
    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON);
    expect(result).toHaveLength(1);
  });

  it("o título da seção reflete o raio utilizado", () => {
    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON, 50);
    expect(result[0].title).toBe("Raio de 50km");
  });

  it("inclui praias dentro do raio e exclui as que estão fora", () => {
    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON, 50);
    const names = result[0].data.map((b) => b.praia);

    expect(names).toContain("Praia dos Ingleses");
    expect(names).not.toContain("Praia Central");
  });

  it("ignora praias com coordenadas inválidas sem lançar erro", () => {
    expect(() =>
      getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON)
    ).not.toThrow();

    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON);
    const names = result[0].data.map((b) => b.praia);
    expect(names).not.toContain("Praia Fantasma");
  });

  it("respeita o limite de maxResults", () => {
    const manyBeaches: BeachLocalization = {
      cidade: Array.from({ length: 10 }, (_, i) =>
        makeBeach({
          praia: `Praia ${i}`,
          latitude: String(USER_LAT + i * 0.001),
          longitude: String(USER_LON + i * 0.001),
        })
      ),
    };

    const result = getNearestBeaches(manyBeaches, USER_LAT, USER_LON, 100, 3);
    expect(result[0].data.length).toBeLessThanOrEqual(3);
  });

  it("retorna praias ordenadas da mais próxima para a mais distante", () => {
    const localization: BeachLocalization = {
      cidade: [
        makeBeach({ praia: "Praia Distante", latitude: String(USER_LAT - 0.2), longitude: String(USER_LON) }),
        makeBeach({ praia: "Praia Próxima", latitude: String(USER_LAT - 0.01), longitude: String(USER_LON) }),
      ],
    };

    const result = getNearestBeaches(localization, USER_LAT, USER_LON, 100);
    const names = result[0].data.map((b) => b.praia);

    expect(names[0]).toBe("Praia Próxima");
    expect(names[1]).toBe("Praia Distante");
  });

  it("retorna seção vazia quando nenhuma praia está dentro do raio", () => {
    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON, 1);
    expect(result[0].data).toHaveLength(0);
  });

  it("retorna seção vazia para um BeachLocalization vazio", () => {
    const result = getNearestBeaches({}, USER_LAT, USER_LON);
    expect(result[0].data).toHaveLength(0);
  });

  it("não vaza propriedades internas (_distanceKm, city) no resultado", () => {
    const result = getNearestBeaches(MOCK_LOCALIZATION, USER_LAT, USER_LON);
    const beach = result[0].data[0];

    expect(beach).not.toHaveProperty("_distanceKm");
    expect(beach).not.toHaveProperty("city");
  });
});