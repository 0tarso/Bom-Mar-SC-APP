import { View, Text, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import logoTextSC from "@/assets/logoTextSC.png"
import LottieView from 'lottie-react-native'

import loadingWave from "@/assets/animations/loadingWaves.json"

const SplashScreen = () => {
  return (
    <View style={{
      backgroundColor: "#fff",
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <StatusBar backgroundColor='#fff' style='dark' />
      <Image
        source={logoTextSC}
        style={{ marginTop: 100, width: 330, resizeMode: 'contain' }}
      />

      <View style={{ position: 'relative', width: '100%', height: 150 }}>
        <LottieView
          source={loadingWave}
          autoPlay
          loop
          speed={0.7}
          style={[
            {
              width: "100%",
              height: 100,
              position: 'absolute',
              zIndex: 20,
              top: -20
            },

          ]}
        />

      </View>
    </View>
  )
}

export default SplashScreen