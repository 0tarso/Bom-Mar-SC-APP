//React ================================================
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Toast } from 'toastify-react-native';

//Styles
import { COLORS } from '@/src/Theme/Colors';
import { styles } from './styles';

//Components
import HomeHeader from '@/src/components/HomeHeader';
import BeachList from '@/src/components/BeachList';
import FontAwesome from '@expo/vector-icons/FontAwesome';

//Hooks
import { useLocation } from '@/src/hooks/useLocation';

const HomeScreen = () => {

  const { refreshLocation, location, city, region, loading } = useLocation()

  useEffect(() => {
    const handleGetUserLocation = async () => {
      try {
        await refreshLocation()
      } catch (error) {
        Toast.info("Erro ao buscar local")
      }
    }

    handleGetUserLocation()
  }, [])


  return (
    <View style={styles.container}>

      <View style={styles.homeHeaderContainer}>
        <HomeHeader />
      </View>


      <View style={styles.locationArea}>

        <View style={styles.locationContainer}>

          <Text style={styles.locationText}>
            {loading ? "Localizando" : `${city} - ${region}`}
          </Text>
          <TouchableOpacity
            style={styles.locationUpdateButton}
            hitSlop={15}
            onPress={(async () => await refreshLocation())}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.BLUE_ENABLE} size={16} />
            ) : (
              <FontAwesome name="refresh" size={16} color={COLORS.BLUE_ENABLE} />
            )}
          </TouchableOpacity>

        </View>

      </View>

      <BeachList />

    </View>
  )
}

export default HomeScreen