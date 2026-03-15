//React ================================================
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import api from '@/src/api/api';
import AlertWeatherModal from '@/src/components/AlertWeatherModal';
import { WeatherAlert } from '@/src/types';

const HomeScreen = () => {

  const { height } = Dimensions.get("window")
  const { refreshLocation, location, city, region, loading } = useLocation()

  const [weatherAlert, setWeatherAlert] = useState<WeatherAlert | null>(null)

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

  useEffect(() => {
    const getWeatherAlerts = async () => {
      try {
        const response = await api.get('/alertas')

        if (response.data['dados']) {
          setWeatherAlert(response.data['dados'][0])
          // console.log(response.data)
        }
      } catch (error) {
        Toast.error("Erro ao obter alertas")
      }
    }

    getWeatherAlerts()
  }, [])

  return (
    <View style={styles.container}>

      <View style={styles.homeHeaderContainer}>
        <HomeHeader />
      </View>



      {weatherAlert && (

        <AlertWeatherModal props={weatherAlert} />
      )}

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