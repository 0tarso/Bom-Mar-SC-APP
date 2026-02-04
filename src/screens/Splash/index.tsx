import { View, Text, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import logoTextSC from "@/assets/logoTextSC.png"
import LottieView from 'lottie-react-native'

import loadingWave from "@/assets/animations/loadingWaves.json"
import { styles } from './styles'

const SplashScreen = () => {
  return (
    <View style={styles.container}>

      <StatusBar backgroundColor='#fff' style='dark' />

      <Image
        source={logoTextSC}
        style={styles.logoImage}
      />

      <View style={styles.animationContainer}>
        <LottieView
          source={loadingWave}
          autoPlay
          loop
          speed={0.7}
          style={styles.animation}
        />

      </View>
    </View>
  )
}

export default SplashScreen