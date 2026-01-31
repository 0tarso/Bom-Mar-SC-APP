import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserBeachs } from '@/src/contexts/UserBeachsContext'
import BeachSectionList from '@/src/components/BeachSectionList'
import LoadingWave from '@/src/components/LoadingWave'
import { filterData } from '@/src/components/BeachList/actions'
import { COLORS } from '@/src/Theme/Colors'
import EmptyFavorites from '@/src/components/EmptyFavorites'
import { BeachLocalization } from '@/src/types'
import { useLocation } from '@/src/hooks/useLocation'
import { useNavigation } from '@react-navigation/native'

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