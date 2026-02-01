import React, { useCallback, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'

import BeachCard from '../BeachCard'
import { styles } from './styles'
import { CustomModal } from '../CustomModal'
import BeachInfoModal from '../BeachInfoModal'
import { Beach, BeachLocalization } from '@/src/types'
import { useUserBeachs } from '@/src/contexts/UserBeachsContext'

interface Props {
  data: BeachLocalization[]
}

type ListItem =
  | { type: 'header'; title: string; count: number }
  | { type: 'item'; beach: Beach }

const ESTIMATED_ITEM_SIZE = 140
const ESTIMATED_HEADER_SIZE = 48

const BeachSectionList = ({ data }: Props) => {
  const { handleUpdateFavorite } = useUserBeachs()

  const [showModal, setShowModal] = useState(false)
  const [beachDetailsModal, setBeachDetailsModal] = useState<Beach | null>(null)

  const { listData, stickyHeaderIndices } = useMemo(() => {
    const flatData: ListItem[] = []
    const stickyIndices: number[] = []

    let index = 0

    for (const section of data) {
      // header
      stickyIndices.push(index)

      flatData.push({
        type: 'header',
        title: section.title,
        count: section.data.length,
      })

      index++

      // items
      for (const beach of section.data) {
        flatData.push({
          type: 'item',
          beach,
        })
        index++
      }
    }

    return {
      listData: flatData,
      stickyHeaderIndices: stickyIndices,
    }
  }, [data])


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


  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === 'header') {
        return (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.headerTitle}>{item.title}</Text>
            <Text style={styles.sectionFooterText}>
              {item.count} {item.count > 1 ? 'praias' : 'praia'}
            </Text>
          </View>
        )
      }

      return (
        <BeachCard
          beach={item.beach}
          onPressFavorite={() => toggleFavorite(item.beach)}
          onPressShowDetail={() => handleShowBeachDetails(item.beach)}
        />
      )
    },
    [toggleFavorite, handleShowBeachDetails]
  )

  const keyExtractor = useCallback((item: ListItem, index: number) => {
    if (item.type === 'header') {
      return `header-${item.title}-${index}`
    }
    return `${item.beach.latitude}-${item.beach.longitude}`
  }, [])

  return (
    <>

      <CustomModal visible={showModal} onClose={() => setShowModal(false)}>
        <BeachInfoModal beach={beachDetailsModal} />
      </CustomModal>

      <FlashList
        data={listData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        stickyHeaderIndices={stickyHeaderIndices}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      />
    </>
  )
}

export default BeachSectionList
