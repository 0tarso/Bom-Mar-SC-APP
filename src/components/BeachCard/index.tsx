//React
import React, { memo, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

//Style
import { styles } from "./styles"
import { COLORS } from '@/src/Theme/Colors'

//Expo
import { FontAwesome } from "@expo/vector-icons"

//Types
import { Beach } from '@/src/types'

//Service
import { shareText } from '@/src/services/shareText'

interface Props {
  beach: Beach
  onPressFavorite: () => void
  onPressShowDetail: () => void
}

const BeachCard = memo((props: Props) => {

  const [loading, setLoading] = useState(false)

  const handleFavorite = async () => {
    setLoading(true)
    await props.onPressFavorite()
    setLoading(false)
  }


  const handleShareBeachLocal = async () => {
    await shareText(props.beach, props.beach.situacao)
  }

  return (
    <View style={[
      styles.container,
      (props.beach.situacao === "IMPRÓPRIA") && {
        borderColor: COLORS.RED_CAUTION,
      }
    ]}
    // onPress={props.onPressCard}
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
        columnGap: 8,
        marginTop: 12,
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 20

      }}>
        <View style={styles.navigationMapButtonContainer}>
          <TouchableOpacity
            // style={}
            onPress={props.onPressShowDetail}
            // hitSlop={10}
            style={{ flexDirection: "row", columnGap: 5, alignItems: 'baseline' }}
          >
            <FontAwesome name='map-marker' size={14} color={COLORS.FULL_WHITE} />
            <Text style={styles.navigationButtonText}>Visualizar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigationMapButtonContainer}>
          <TouchableOpacity
            // style={}
            onPress={props.onPressFavorite}
            onPressOut={handleFavorite}
            // hitSlop={10}
            style={{ flexDirection: "row", columnGap: 5, alignItems: 'baseline' }}
          >
            <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
              {loading ? (
                <ActivityIndicator size={12} color={COLORS.FULL_WHITE} />
              ) : props.beach.favorite ? (
                <FontAwesome name="heart" size={14} color={COLORS.FULL_WHITE} />
              ) : (
                <FontAwesome name="heart-o" size={14} color={COLORS.FULL_WHITE} />
              )}
            </View>
            <Text style={styles.navigationButtonText}>Favoritar</Text>
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
})

export default BeachCard
