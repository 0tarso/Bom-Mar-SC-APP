import { View, Text, SectionList, SectionListProps, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BeachCard from '../BeachCard';
import { COLORS } from '@/src/Theme/Colors';
import { updateFavorite } from '@/src/services/updateFavorite';
import { useUserBeachs } from '@/src/contexts/UserBeachsContext';
import { Beach, BeachLocalization } from '@/src/types';
import { openRouteWithCoords } from '@/src/services/openMaps';
import { useLocation } from '@/src/hooks/useLocation';
import { styles } from './styles';
import { CustomModal } from '../CustomModal';
import axios from 'axios';
import Constants from 'expo-constants'
import BeachInfoModal from '../BeachInfoModal';

interface Props extends SectionListProps<any> {
  data: BeachLocalization[]
}


const BeachSectionList = ({ data, ...rest }: Props) => {
  const { handleUpdateFavorite } = useUserBeachs()

  const [showModal, setShowModal] = useState(false)
  const [beachDetailsModal, setBeachDetailsModal] = useState<Beach | null>(null)

  const toggleFavorite = useCallback(
    async (item: Beach) => {
      await handleUpdateFavorite(item)
    },
    [handleUpdateFavorite]
  )

  const handleShowBeachDetails = useCallback((item: Beach) => {
    setBeachDetailsModal(item)
    setShowModal(true)
  }, [])

  const handleCloseShowBeachDetails = async () => {
    // setBeachDetailsModal(null)
    setShowModal(false)
  }

  return (
    <>

      <CustomModal
        visible={showModal}
        onClose={() => handleCloseShowBeachDetails()}
      >
        <BeachInfoModal
          beach={beachDetailsModal}
        />
      </CustomModal>


      <SectionList
        contentContainerStyle={{ paddingBottom: 150 }}
        sections={data}
        showsVerticalScrollIndicator={false}

        keyExtractor={(item, index) => `${item.latitude}${item.longitude}`}
        renderItem={({ item }) => (
          <BeachCard
            beach={item}
            onPressFavorite={() => toggleFavorite(item)}
            onPressShowDetail={() => handleShowBeachDetails(item)}
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
    </>
  )
}

export default BeachSectionList