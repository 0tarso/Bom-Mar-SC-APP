import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/src/Theme/Colors';
import HomeHero from '@/src/components/HomeHero';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent />
      <View style={{ marginTop: 40, height: 220 }}>

        <HomeHero />

      </View>
    </View>
  )
}

export default HomeScreen