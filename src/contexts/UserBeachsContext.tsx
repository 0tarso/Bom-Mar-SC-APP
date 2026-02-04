//React ================================================
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

//Types
import { Beach, BeachLocalization } from "../types";


//Services
import { getAllBeachs } from "../services/getAllBeachs";
import { getAllFavorites } from "../services/getAllFavorites";
import { updateFavorite } from "../services/updateFavorite";

interface UserBeachsContext {
  beachs: BeachLocalization[] | [],
  errorFetchBeach: boolean,
  beachsFavorite: BeachLocalization[],
  loadingFavorites: boolean,
  loadingBeachs: boolean,
  loadingUpdateFavorite: boolean,
  handleUpdateFavorite: (item: Beach) => Promise<void>
}


const UserBeachs = createContext<UserBeachsContext | undefined>(undefined);

export function useUserBeachs() {
  const context = useContext(UserBeachs);
  if (context === undefined) {
    throw new Error('useUserBEachs deve ser usado dentro de um UserProvider');

  }

  return context
}


export function UserBeachsProvider({ children }: { children: ReactNode }) {

  const [beachs, setBeachs] = useState<BeachLocalization[] | []>([]);
  const [errorFetchBeach, setErrorFetchBeach] = useState(false)
  const [beachsFavorite, setBeachsFavorite] = useState<BeachLocalization[]>([]);

  const [loadingFavorites, setLoadingFavorites] = useState(false)
  const [loadingBeachs, setLoadingBeachs] = useState(false)
  const [loadingUpdateFavorite, setLoadingUpdateFavorite] = useState(false)

  const [error, setError] = useState(false)


  useEffect(() => {
    const fetch = async () => {
      await handleGetAllBeachs()
      await handleGetFavorites()
    }

    fetch()
  }, [])

  const handleGetAllBeachs = async () => {
    let data

    setErrorFetchBeach(false)
    setLoadingBeachs(true)

    try {
      data = await getAllBeachs()

      if (data) {
        setBeachs(data)
      }

    } catch (error) {
      setErrorFetchBeach(true)
    }

    finally {
      setLoadingBeachs(false)
    }
  }

  const handleGetFavorites = async () => {
    setLoadingFavorites(true)
    setError(false)

    try {
      const favorites = await getAllFavorites()
      if (!favorites) return

      setBeachsFavorite(favorites)

      const favoriteIds = new Set<string>()

      Object.values(favorites).forEach(beachs =>
        beachs.forEach(item => {
          favoriteIds.add(`${item.latitude}${item.longitude}`)
        })
      )

      setBeachs(prev => {
        const updated = {}

        Object.entries(prev).forEach(([city, beachs]) => {
          updated[city] = beachs.map(beach => ({
            ...beach,
            favorite: favoriteIds.has(`${beach.latitude}${beach.longitude}`)
          }))
        })

        return updated
      })

    } catch (error) {
      setError(true)
    } finally {
      setLoadingFavorites(false)
    }
  }


  const handleUpdateFavorite = async (
    item: Beach
  ) => {

    try {
      await updateFavorite(item)
      await handleGetFavorites()

      Toast.success("Favoritos atualizados")
    } catch (error) {
      Toast.info("Erro ao adicionar favorito")
    }

    finally {
      setLoadingUpdateFavorite(false)
    }
  }

  const value: UserBeachsContext = {
    beachs,
    errorFetchBeach,
    beachsFavorite,
    handleUpdateFavorite,
    loadingFavorites,
    loadingBeachs,
    loadingUpdateFavorite
  }

  return (
    <UserBeachs.Provider value={value}>
      {children}
    </UserBeachs.Provider>
  )
}