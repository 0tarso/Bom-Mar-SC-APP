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
          <Text style={styles.sectionFooterText}>{section.data.length} {section.data.length > 1 ? "praias" : "praia"}</Text>
          {/* <TouchableOpacity style={styles.mapButtonContainer}
            onPress={() => navigateToBeachLocalizationMap(section.title)}
          >
            <Text style={styles.mapButtonText}>Visitar</Text>
          </TouchableOpacity> */}
        </View>
      )}
      stickySectionHeadersEnabled
      initialNumToRender={7}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews

      {...rest}


    />
  )
}

export default BeachSectionList