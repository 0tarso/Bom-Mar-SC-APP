//React
import React, { memo, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Svg, { Path } from "react-native-svg"

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
      // (props.beach.situacao === "IMPRÓPRIA") && {
      //   borderColor: COLORS.RED_CAUTION,
      // }
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
      {/* <Text style={styles.dataColeta}>Análise: {props.beach.data_coleta}</Text> */}

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
            style={{ flexDirection: "row", columnGap: 5, alignItems: 'baseline', elevation: 0 }}
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
      <View style={{
        position: 'absolute',
        zIndex: -10,
        bottom: 0,
        width: "100%",
        transform: [{ rotateX: "180deg" }],
      }}>
        <Svg
          width="120%"
          height={10}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <Path
            d="M0,64 C120,90 240,120 360,112 480,104 600,64 720,48 840,32 960,40 1080,56 1200,72 1320,96 1440,80 L1440,0 L0,0 Z"
            fill={
              (props.beach.situacao === "IMPRÓPRIA") ? COLORS.RED_CAUTION : COLORS.BLUE_PRIMARY
            }
          />
        </Svg>
      </View>
      <View style={{
        position: 'absolute',
        zIndex: -15,
        bottom: 5,
        width: "100%",
        transform: [{ rotateX: "180deg" }],
        opacity: 0.2
      }}>
        <Svg
          width="120%"
          height={20}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <Path
            d="M0,64 C120,90 240,120 360,112 480,104 600,64 720,48 840,32 960,40 1080,56 1200,72 1320,96 1440,80 L1440,0 L0,0 Z"
            fill={
              (props.beach.situacao === "IMPRÓPRIA") ? COLORS.RED_CAUTION : COLORS.BLUE_PRIMARY
            }
          />
        </Svg>
      </View>
    </View>
  )
})

export default BeachCard
