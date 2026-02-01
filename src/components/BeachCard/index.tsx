import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { COLORS } from '@/src/Theme/Colors'

import { FontAwesome } from "@expo/vector-icons"
import { Beach } from '@/src/types'
import { styles } from "./styles"
import { openRouteWithCoords } from '@/src/services/openMaps'
import { useLocation } from '@/src/hooks/useLocation'
import { shareText } from '@/src/services/shareText'

interface Props {
  beach: Beach
  onPressFavorite: () => void
  onPressCard: () => void
}

const BeachCard = memo((props: Props) => {

  const { location } = useLocation()

  const [loading, setLoading] = useState(false)

  const timeoutLoadingAction = () => {
    setLoading(true)

    setTimeout(() => setLoading(false), 1000)
  }

  const navigateToBeachLocalizationMap = async () => {
    const beach = `Praia ${props.beach}, Santa Catarina, Brasil`

    // console.log("Praia a visitar======================")
    // console.log(beach)

    openRouteWithCoords(
      location.latitude,
      location.longitude,
      Number(props.beach.latitude),
      Number(props.beach.longitude),
    )
  }

  const handleShareBeachLocal = async () => {
    await shareText(props.beach, props.beach.situacao)
  }

  return (
    <TouchableOpacity style={[
      styles.container,
      (props.beach.situacao === "IMPRÓPRIA") && { borderColor: COLORS.RED_CAUTION }
    ]}
      onPress={props.onPressCard}
    >

      <TouchableOpacity style={{
        position: "absolute",
        right: 8,
        // top: 15,
        padding: 15,
        // backgroundColor: "red",
        zIndex: 1

      }}
        hitSlop={15}
        onPress={() => handleShareBeachLocal()}
      >
        <FontAwesome name='send' size={18} color={COLORS.BLUE_PRIMARY} />
      </TouchableOpacity>

      <Text style={styles.praia}>{props.beach.praia}</Text>
      <Text style={styles.complemento}>{props.beach.complemento}</Text>
      <Text style={styles.dataColeta}>Análise: {props.beach.data_coleta}</Text>

      <View style={{
        flexDirection: 'row',
        columnGap: 12,
        marginTop: 12,
        justifyContent: 'flex-end',

      }}>
        <View style={styles.navigationMapButtonContainer}>
          <TouchableOpacity
            // style={}
            onPress={() => navigateToBeachLocalizationMap()}
            hitSlop={10}
            style={{ flexDirection: "row", columnGap: 5, alignItems: 'baseline' }}
          >
            <FontAwesome name='map-marker' size={14} color={COLORS.FULL_WHITE} />
            <Text style={styles.navigationButtonText}>Visitar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigationMapButtonContainer}>
          <TouchableOpacity
            // style={}
            onPress={props.onPressFavorite}
            onPressOut={() => timeoutLoadingAction()}
            hitSlop={10}
            style={{ flexDirection: "row", columnGap: 5, alignItems: 'baseline' }}
          >
            {loading ? (
              <ActivityIndicator size={13} color={COLORS.FULL_WHITE} />
            ) : (

              <View>

                {props.beach.favorite ? (
                  <FontAwesome
                    name="heart"
                    color={COLORS.FULL_WHITE}
                    size={14}
                  />

                ) : (

                  <FontAwesome
                    name="heart-o"
                    color={COLORS.FULL_WHITE}
                    size={14}
                  />
                )}

              </View>

            )}
            <Text style={styles.navigationButtonText}>Favoritar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </TouchableOpacity>
  )
})

export default BeachCard
