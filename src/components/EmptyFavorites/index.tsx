import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import LottieView from 'lottie-react-native'

import empty_animation from "@/assets/animations/empty_favorites_animation.json"

const EmptyFavorites = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'black',
    }}>

      <Text style={{
        color: COLORS.BLUE_ENABLE,
        fontSize: 20,
        letterSpacing: 3,
        // textAlign: 'left'
      }}>Cadê suas</Text>
      <Text style={{
        color: COLORS.BLUE_ENABLE,
        fontSize: 40,
        fontWeight: "600"
      }}>FAVORITAS</Text>
      <Text style={{
        color: COLORS.BLUE_ENABLE,
        fontSize: 70,
        fontWeight: 'bold',
        letterSpacing: 5,
        marginLeft: -4,
        marginTop: -15,
        marginBottom: 150
      }}>HEIN!?</Text>

      <View style={{ width: 350, position: 'absolute', top: 150, right: -50 }}>
        <LottieView
          source={empty_animation}
          autoPlay
          style={[
            {
              width: "100%",
              height: 400,
              aspectRatio: 1
            },
          ]}
        />

      </View>
    </View>
  )
}

export default EmptyFavorites