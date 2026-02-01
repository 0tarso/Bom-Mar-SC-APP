//React ================================================
import { View, Text, Image } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'toastify-react-native'

//Expo ================================================
import { FontAwesome } from '@expo/vector-icons'

//Services ================================================
import { getTripDistance } from '@/src/services/getTripDistance'
import { getWeather } from '@/src/services/getWeather'
import { openRouteWithCoords } from '@/src/services/openMaps'

//Types ================================================
import { Beach, Weather } from '@/src/types'
import { useLocation } from '@/src/hooks/useLocation'

//Components ================================================
import LoadingWave from '../LoadingWave'
import CustomButton from '../CustomButton'
import CustomTooltip from '../ToolTip'

//Styles ================================================
import { COLORS } from '@/src/Theme/Colors'
import { styles } from './styles'

//Assets ================================================
import temperature_icon from "@/assets/icons/colored_termometer.png"
import human_sense_icon from "@/assets/icons/colored_human_sense.png"
import weather_icon from "@/assets/icons/clear_weather.png"
import wind_icon from "@/assets/icons/colored_wind.png"

interface Props {
  beach: Beach
}

const BeachInfoModal = memo((props: Props) => {
  const { location } = useLocation()
  const [distanceToBeach, setDistanceToBeach] = useState("")
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    if (!props.beach || !location) {
      return
    }

    const fetchDistanceTrip = async () => {
      try {
        const response = await getTripDistance(props.beach, location)
        setDistanceToBeach(response)
      } catch (error) {
        Toast.info("Erro ao calcular rota")
      }
    }

    const fetchWeather = async () => {
      try {
        const response = await getWeather(
          Number(props.beach.latitude),
          Number(props.beach.longitude)
        )
        // console.log(response)

        if (response) {
          setWeather(response)
        }
      } catch (error) {
        console.log(error)
        Toast.info("Erro ao buscar clima")
      }
    }

    fetchWeather()
    fetchDistanceTrip()

  }, [props.beach, location])


  const navigateToBeachLocalizationMap = async () => {
    const beach = `Praia ${props.beach}, Santa Catarina, Brasil`

    // console.log("Praia a visitar======================")
    // console.log(beach)

    openRouteWithCoords(
      location.latitude,
      location.longitude,
      Number(props.beach.latitude),
      Number(props.beach.longitude),
    )
  }

  return (
    <>
      {!weather ? (
        <LoadingWave />

      ) : (
        <>
          <Text
            style={styles.praia}
          >{props.beach.praia}</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.distancia}>
              {distanceToBeach === "" ? "Calculando rota..." : `Aproximadamente: ${distanceToBeach}km`}
            </Text>


            <View style={{ marginLeft: 5 }}>
              <CustomTooltip
                text='A distância pode variar dependendo do trânsito e da rota no momento.'
              >
                <FontAwesome name='info-circle' size={18} color={COLORS.BLUE_DISABLE} />
              </CustomTooltip>
            </View>
          </View>


          <Text style={styles.complemento}>{props.beach.complemento}</Text>


          {/* <Text style={styles.cardContainerTitle}>Condições</Text> */}
          <View style={styles.cardsContainer}>

            <View style={styles.card}>

              <Image source={temperature_icon} style={{ width: 40, height: 40 }} />
              <View>
                <Text style={styles.textValue}>{weather?.atual?.temperatura}°c</Text>
                <Text style={styles.textLabel}>Temperatura</Text>
              </View>

            </View>

            <View style={styles.card}>
              <Image source={human_sense_icon} style={{ marginRight: 10, marginLeft: 5, width: 38, height: 38 }} />
              <View>
                <Text
                  style={[styles.textValue, (weather.atual.sensacao > 28) && { color: COLORS.RED_CAUTION }]}
                >{weather?.atual?.sensacao}°c</Text>
                <Text style={styles.textLabel}>Sensação</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Image source={weather_icon} style={{ width: 40, height: 40 }} />
              <View style={{}}>
                <Text style={[styles.textValue, { fontSize: 14, width: "100%" }]}>{weather?.atual?.clima?.descricao.toUpperCase()}</Text>
                <Text style={[styles.textLabel,]}>Clima</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Image source={wind_icon} style={{ width: 35, height: 35 }} />
              <View>
                <View style={{ flexDirection: 'row', alignItems: "baseline" }}>
                  <Text
                    style={[styles.textValue, { fontSize: 24 }, (weather.atual.vento.label === 'Vento forte') && { color: COLORS.RED_CAUTION }]}>
                    {weather?.atual?.vento?.velocidade_kmh}</Text>
                  <Text style={[styles.textValue, { fontSize: 12 }]}>km/h</Text>
                </View>
                <Text style={styles.textLabel}>Vento</Text>
              </View>
            </View>


          </View>

          <CustomButton
            backgroundColor={COLORS.BUTTON_FIRST_BACKGROUND}
            onPress={() => navigateToBeachLocalizationMap()}
            title='Visitar'
            titleColor={COLORS.BUTTON_FIRST_TEXT}
          />
        </>
      )}



    </>
  )
})

export default BeachInfoModal