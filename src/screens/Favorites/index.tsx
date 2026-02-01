//React ================================================
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

//Types ================================================
import { BeachLocalization } from '@/src/types'


//Context-hook ================================================
import { useUserBeachs } from '@/src/contexts/UserBeachsContext'
import { useLocation } from '@/src/hooks/useLocation'

//Components
import BeachSectionList from '@/src/components/BeachSectionList'
import { filterData } from '@/src/components/BeachList/actions'
import EmptyFavorites from '@/src/components/EmptyFavorites'

const FavoritesScreen = () => {

  const { beachsFavorite, loadingFavorites } = useUserBeachs()
  const { city, location } = useLocation()


  const [filteredBeachs, setFilteredBeachs] = useState<BeachLocalization[] | []>([])

  useEffect(() => {
    filterData(beachsFavorite, setFilteredBeachs)
  }, [beachsFavorite])



  return (
    <View
      style={{
        flex: 1
      }}
    >

      <View style={{
        flex: 1,
        paddingHorizontal: 20
      }}>

        {/* {loadingFavorites ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <LoadingWave />
          </View>
        ) : ( */}

        <View style={{ flex: 1 }}>

          {filteredBeachs.length > 0 ? (
            <BeachSectionList
              data={filteredBeachs}
            />

          ) : (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: "center"
            }}>

              <EmptyFavorites />
            </View>

          )}

        </View>
        {/* )} */}


      </View>
    </View>
  )
}

export default FavoritesScreen