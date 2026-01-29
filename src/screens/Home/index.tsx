import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/src/Theme/Colors';
import HomeHero from '@/src/components/HomeHero';
import BeachList from '@/src/components/BeachList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Toast } from 'toastify-react-native';
import { useLocation } from '@/src/hooks/useLocation';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const HomeScreen = () => {

  const { refreshLocation, location, city, region } = useLocation()

  useEffect(() => {
    const handleGetUserLocation = async () => {
      try {
        await refreshLocation()
      } catch (error) {
        Toast.info("Erro ao buscar local")
      }
    }

    console.log(location)
    handleGetUserLocation()
  }, [])


  return (
    <SafeAreaView style={{ flex: 1, }}>
      <StatusBar translucent backgroundColor='#ffff' />

      <View style={{
        paddingLeft: 20,
        paddingVertical: 10,
        backgroundColor: "#ffff"
        // flexDirection: "row"
      }}>
        {/* <Text style={{
          fontWeight: "400",
          color: COLORS.BLUE_DISABLE
        }}>Você está em:</Text> */}

        <View style={{
          flexDirection: 'row',

        }}>

          <Text style={{
            fontWeight: "600",
            color: COLORS.BLUE_PRIMARY
          }}>{city} - {region}</Text>

          <TouchableOpacity
            style={{
              marginLeft: 10
            }}
            hitSlop={15}
            onPress={(async () => await refreshLocation())}
          >
            <FontAwesome name="refresh" size={18} color={COLORS.BLUE_ENABLE} />
          </TouchableOpacity>

        </View>

      </View>
      <View style={{ height: 120 }}>
        <HomeHero />
      </View>


      <BeachList />

    </SafeAreaView>
  )
}

export default HomeScreen