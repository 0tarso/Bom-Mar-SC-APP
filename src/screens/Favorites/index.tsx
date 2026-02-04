//React ================================================
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'

//Types ================================================
import { BeachLocalization } from '@/src/types'


//Context-hook ================================================
import { useUserBeachs } from '@/src/contexts/UserBeachsContext'

//Components
import BeachSectionList from '@/src/components/BeachSectionList'
import { filterData } from '@/src/components/BeachList/actions'
import EmptyFavorites from '@/src/components/EmptyFavorites'
import { styles } from './styles'

const FavoritesScreen = () => {

  const { beachsFavorite } = useUserBeachs()

  const [filteredBeachs, setFilteredBeachs] = useState<BeachLocalization[] | []>([])

  useEffect(() => {
    filterData(beachsFavorite, setFilteredBeachs)
  }, [beachsFavorite])



  return (
    <View style={styles.container}>

      <View style={styles.listArea}>

        <View style={styles.listContainer}>

          {filteredBeachs.length > 0 ? (
            <BeachSectionList
              data={filteredBeachs}
            />

          ) : (
            <View style={styles.emptyListContainer}>
              <EmptyFavorites />
            </View>

          )}

        </View>

      </View>

    </View>
  )
}

export default FavoritesScreen