import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

import loadingWaveAnimation from "@/assets/animations/loadingWaves.json"

const LoadingWave = () => {
  return (
    <View style={{ position: 'relative', width: '100%', height: 150 }}>
      <LottieView
        source={loadingWaveAnimation}
        autoPlay
        loop
        speed={2}
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
  )
}

export default LoadingWave