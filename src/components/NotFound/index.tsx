import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

import notFoundANimation from "@/assets/animations/error_animation.json"

export default function NotFoundAnimation() {
  return (
    <View style={{ position: 'relative', width: '100%', height: 150 }}>
      <LottieView
        source={notFoundANimation}
        autoPlay
        loop
        speed={2}
        style={[
          {
            width: "100%",
            height: 200,
            // position: 'absolute',
            zIndex: 20,
            // top: -20
          },
        ]}
      />

    </View>
  )
}