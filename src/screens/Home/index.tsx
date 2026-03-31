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
import { useAppVersion } from '@/src/contexts/AppVersionProvider';
import { UpdateModal } from '@/src/components/UpdateModal';
import { useInternet } from '@/src/contexts/InternetProvider';
import NotFoundAnimation from '@/src/components/NotFound';

const HomeScreen = () => {
  const { isConnected } = useInternet()
  const { versionData, isForceUpdate, isOptionalUpdate } = useAppVersion()
  const { refreshLocation, city, region, loading } = useLocation()

  const [weatherAlert, setWeatherAlert] = useState<WeatherAlert | null>(null)

  const [showOptionalUpdateModal, setShowOptionalUpdateModal] = useState(true);

  const visible = isForceUpdate || (isOptionalUpdate && showOptionalUpdateModal);

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

  // useEffect(() => {
  //   console.log('======================')
  //   console.log('versionDataa > ', versionData)
  //   // console.log(versionData)
  //   console.log('force Update: ', isForceUpdate)
  //   console.log('optional Update: ', isOptionalUpdate)
  // }, [versionData])



  useEffect(() => {
    const getWeatherAlerts = async () => {
      try {
        const response = await api.get('/alertas', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })

        if (response.data['dados']) {
          setWeatherAlert({ ...response.data['dados'][0] })
          // console.log('response.data de weatheralerts')
          // console.log(response.data[0])
        }
      } catch (error) {
        Toast.error("Erro ao obter alertas.")
      }
    }

    getWeatherAlerts()
  }, [])


  return (
    <View style={styles.container}>



      <View style={styles.homeHeaderContainer}>
        <HomeHeader />
      </View>

      <UpdateModal
        visible={visible}
        force={isForceUpdate}
        onClose={() => setShowOptionalUpdateModal(false)}
      />

      {weatherAlert?.codigo && (
        <AlertWeatherModal props={weatherAlert} key={weatherAlert.codigo} />
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


      {isConnected === false ? (
        <View style={{
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: 'center',
        }}>
          <NotFoundAnimation />
          <Text style={{
            fontFamily: "MontserratBold",
            marginTop: 24
          }}>Sem conexão</Text>
        </View>

      ) : (
        <>
          <BeachList />
        </>
      )}

    </View>
  )
}

export default HomeScreen