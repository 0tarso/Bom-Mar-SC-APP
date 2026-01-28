import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import LottieView from 'lottie-react-native'

import empty_animation from "@/assets/animations/empty_favorites_animation.json"
import { styles } from './styles'

const EmptyFavorites = () => {
  return (
    <View style={styles.container}>

      <Text style={styles.stText}>Cadê suas</Text>
      <Text style={styles.ndText}>FAVORITAS</Text>
      <Text style={styles.rdText}>HEIN!?</Text>

      <View style={styles.animationContainer}>
        <LottieView
          source={empty_animation}
          autoPlay
          style={styles.animation}
        />

      </View>
    </View>
  )
}

export default EmptyFavorites