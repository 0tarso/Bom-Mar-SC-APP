import { View, Text, SectionList, SectionListProps, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import BeachCard from '../BeachCard';
import { COLORS } from '@/src/Theme/Colors';
import { updateFavorite } from '@/src/services/updateFavorite';
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';
import { Beach, BeachLocalization } from '@/src/types';
import { openRouteWithCoords } from '@/src/services/openMaps';
import { useLocation } from '@/src/hooks/useLocation';
import { styles } from './styles';


interface Props extends SectionListProps<any> {
  data: BeachLocalization[]
}


const BeachSectionList = ({ data, ...rest }: Props) => {
  const { handleUpdateFavorite } = useUserBeachs()
  const { location } = useLocation()


  const toggleFavorite = async (item) => {
    await handleUpdateFavorite(item)
  }


  const navigateToBeachLocalizationMap = async (item: Beach) => {
    const beach = `Praia ${item}, Santa Catarina, Brasil`

    // console.log("Praia a visitar======================")
    // console.log(beach)

    openRouteWithCoords(
      location.latitude,
      location.longitude,
      beach
    )
  }

  return (
    <SectionList
      contentContainerStyle={{ paddingBottom: 150 }}
      sections={data}
      showsVerticalScrollIndicator={false}

      keyExtractor={(item, index) => item.complemento + item.local}
      renderItem={({ item }) => (
        <BeachCard
          beach={item}
          onPress={() => toggleFavorite(item)}
        />)}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.headerTitle}>{section.title}</Text>
          <TouchableOpacity style={styles.mapButtonContainer}
            onPress={() => navigateToBeachLocalizationMap(section.title)}
          >
            <Text style={styles.mapButtonText}>Visitar</Text>
          </TouchableOpacity>
        </View>
      )}
      stickySectionHeadersEnabled
      renderSectionFooter={(props) => (
        <Text style={styles.sectionFooterText}>{props.section.data.length} {props.section.data.length > 1 ? "praias" : "praia"}</Text>)
      }
      {...rest}


    />
  )
}

export default BeachSectionList