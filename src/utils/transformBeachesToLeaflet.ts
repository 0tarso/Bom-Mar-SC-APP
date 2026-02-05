import { BeachLocalization } from "../types";

export function transformBeachesToLeaflet(
  data: BeachLocalization[]
) {
  return Object.entries(data).flatMap(([cidade, praias]) =>
    praias.map(praia => ({
      ...praia
    }))
  );
}