export type BeachSituation = "PRÓPRIA" | "IMPRÓPRIA"

export type Beach = {
  complemento: string,
  data_coleta: string,
  favorite?: boolean,
  local: string,
  praia: string,
  situacao: BeachSituation
}

export type BeachLocalization = {
  [city: string]: Beach[]
}


export type FavoriteBeachItem = {

}