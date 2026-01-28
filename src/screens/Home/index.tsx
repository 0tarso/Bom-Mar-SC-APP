import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/src/Theme/Colors';
import HomeHero from '@/src/components/HomeHero';
import BeachList from '@/src/components/BeachList';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar translucent />

      <View style={{ height: 150 }}>
        <HomeHero />
      </View>


      <BeachList />

    </SafeAreaView>
  )
}

export default HomeScreen