import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAllBeachs } from "../services/getAllBeachs";
import { getAllFavorites } from "../services/getAllFavorites";
import { updateFavorite } from "../services/updateFavorite";
import { BeachLocalization } from "../types";
import { Toast } from "toastify-react-native";

interface UserBeachsContext {
  beachs: BeachLocalization[],
  beachsFavorite: BeachLocalization[],
  loadingFavorites: boolean,
  loadingBeachs: boolean,
  loadingUpdateFavorite: boolean,
  handleUpdateFavorite: (item: any) => Promise<void>
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

  const [beachs, setBeachs] = useState<BeachLocalization[]>([]);

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

    setError(false)
    setLoadingBeachs(true)

    try {
      data = await getAllBeachs()

      if (data) {
        setBeachs(data)
      }

    } catch (error) {
      setError(true)
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
          favoriteIds.add(item.praia + item.complemento)
        })
      )

      setBeachs(prev => {
        const updated = {}

        Object.entries(prev).forEach(([city, beachs]) => {
          updated[city] = beachs.map(beach => ({
            ...beach,
            favorite: favoriteIds.has(
              beach.praia + beach.complemento
            )
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
    item: {
      praia: string,
      complemento: string
    }
  ) => {

    setLoadingUpdateFavorite(true)

    try {
      await updateFavorite(item)
      await handleGetFavorites()

      Toast.success("Favoritos atualizados")
    } catch (error) {
      Toast.info("Erro ao subir favorito")
    }

    finally {
      setLoadingUpdateFavorite(false)
    }
  }

  const value: UserBeachsContext = {
    beachs,
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