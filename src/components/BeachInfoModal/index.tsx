//React ================================================
import { View, Text, Image, ScrollView } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { Toast } from 'toastify-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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
import BeachScore from '../BeachScore';

//Styles ================================================
import { COLORS } from '@/src/Theme/Colors'
import { styles } from './styles'

//Assets ================================================
import wind_icon from "@/assets/icons/colored_wind.png"
import humidity_icon from "@/assets/icons/colored_humidity.png"
import sea_wave_height from "@/assets/icons/sea_wave_height.png"
import sea_wave_period from "@/assets/icons/sea_wave_period.png"
import mist_weather_icon from "@/assets/icons/mist_weather_icon.png"
import temperature_icon from "@/assets/icons/colored_termometer.png"
import rain_weather_icon from "@/assets/icons/rain_weather_icon.png"
import human_sense_icon from "@/assets/icons/colored_human_sense.png"
import sea_water_temp_icon from "@/assets/icons/sea_water_temp_icon.png"
import rain_meter_weather_icon from "@/assets/icons/rain_meter_icon.png"
import clear_weather_icon from "@/assets/icons/clear_weather.png"
import cloud_weather_icon from "@/assets/icons/cloud_weather.png"
import drizzle_rain_weather_icon from "@/assets/icons/drizzle_weather_icon.png"
import thunderstorm_weather_icon from "@/assets/icons/thunderstorm_weather_icon.png"


interface Props {
  beach: Beach,
}


const WEATHER_ICONS: Record<string, any> = {
  'Clear': clear_weather_icon,
  'Clouds': cloud_weather_icon,
  'Rain': rain_weather_icon,
  'Drizzle': drizzle_rain_weather_icon,
  'Thunderstorm': thunderstorm_weather_icon,
  'Mist': mist_weather_icon,
  'Fog': mist_weather_icon,
}

const SCORE_TEXT = {
  adulto: {
    Excelente: "Mar calmo e seguro. Ótimo para banho.",
    Bom: "Condições boas, com pequenos cuidados.",
    Atenção: "Mar moderado. Banho exige cautela.",
    "Não recomendado": "Condições desfavoráveis para banho.",
  },
  crianca: {
    Excelente: "Mar bem calmo e seguro para crianças.",
    Bom: "Condições aceitáveis, com supervisão.",
    Atenção: "Mar instável. Não indicado para crianças.",
    "Não recomendado": "Risco elevado para banho infantil.",
  },
  surf: {
    Clássico: "Ondas fortes e bem formadas.",
    Bom: "Boas condições para surfar.",
    Regular: "Dá pra entrar, mas não está ideal.",
    Fraco: "Ondas ruins ou sem formação.",
  },
};

const BeachInfoModal = memo((props: Props) => {
  const { location } = useLocation()
  const [distanceToBeach, setDistanceToBeach] = useState("")
  const [weather, setWeather] = useState<Weather | null>(null)

  const [sea, setSea] = useState(props.beach.previsao_marinha)

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
    openRouteWithCoords(
      location.latitude,
      location.longitude,
      Number(props.beach.latitude),
      Number(props.beach.longitude),
    )
  }

  return (
    <>
      <ScrollView style={{
        height: 600,
        paddingHorizontal: 20
      }}
        showsVerticalScrollIndicator={false}
      >
        {!weather ? (
          <LoadingWave />
        ) : (
          <>
            <View style={{ flexDirection: 'row', alignItems: "flex-end" }}>
              <Text style={styles.distancia}>
                {distanceToBeach === "" ? "Calculando rota..." : `Aproximadamente: ${distanceToBeach}km`}
              </Text>


              <View style={{ marginLeft: 5, marginBottom: 5 }}>
                <CustomTooltip
                  text='A distância pode variar dependendo do trânsito e da rota no momento.'
                >
                  <FontAwesome name='info-circle' size={18} color={COLORS.BLUE_DISABLE} />
                </CustomTooltip>
              </View>
            </View>

            <Text style={styles.complemento}>{props.beach.complemento}</Text>

            <BeachScore
              score={props.beach?.score_de_banho}
              situation={props.beach?.situacao}
              resultado_e_coli={props.beach?.resultado_e_coli}
            />


            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text style={styles.cardContainerTitle}>Condições atuais</Text>

            </View>
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

                <Image
                  source={WEATHER_ICONS[weather?.atual?.clima?.principal] ?? clear_weather_icon}
                  style={{ width: 40, height: 40 }}
                />
                <View style={{ width: "90%" }}>
                  <Text style={[styles.textValue, { textAlign: 'center', fontSize: 14, width: "100%" }]}>{weather?.atual?.clima?.descricao.toUpperCase()}</Text>
                  <Text style={[styles.textLabel,]}>Clima</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Image source={wind_icon} style={{ width: 35, height: 35 }} />
                <View>
                  <View style={{ flexDirection: 'row', alignItems: "baseline" }}>
                    <Text
                      style={[styles.textValue, (weather?.atual?.vento?.label === 'Vento forte') && { color: COLORS.RED_CAUTION }]}>
                      {weather?.atual?.vento?.velocidade_kmh}</Text>
                    <Text style={[styles.textValue, { fontSize: 12 }]}>km/h</Text>
                  </View>
                  <Text style={styles.textLabel}>Vento</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Image source={humidity_icon} style={{ width: 35, height: 35 }} />
                <View>
                  <View style={{ flexDirection: 'row', alignItems: "baseline", justifyContent: 'center' }}>
                    <Text
                      style={[styles.textValue]}>
                      {weather?.atual?.umidade}</Text>
                    <Text style={[styles.textValue, { fontSize: 12 }]}>%</Text>
                  </View>
                  <Text style={styles.textLabel}>Umidade</Text>
                </View>
              </View>

              <View style={styles.card}>
                <Image source={rain_meter_weather_icon} style={{ width: 35, height: 35 }} />
                <View>
                  <View style={{ flexDirection: 'row', alignItems: "baseline", justifyContent: 'center' }}>
                    <Text
                      style={[styles.textValue]}>
                      {weather?.atual?.chuva?.mm_1h}</Text>
                    <Text style={[styles.textValue, { fontSize: 12 }]}>mm</Text>
                  </View>
                  <Text style={styles.textLabel}>Chuva</Text>
                </View>
              </View>


            </View>


            <Text style={[styles.cardContainerTitle, { marginTop: 10 }]}>Mar do dia</Text>

            <View style={styles.table}>
              <View style={{ flexDirection: 'row', alignItems: "flex-end", justifyContent: "space-around" }}>
                <Text style={styles.header} />
                <Text style={styles.header}>Manhã</Text>
                <Text style={styles.header}>Tarde</Text>
                <Text style={styles.header}>Noite</Text>
              </View>
              {/* Cabeçalho */}

              {/* Manhã */}
              <View style={styles.row}>
                <View style={[styles.cell, styles.sideHeader]}>
                  <Image source={sea_water_temp_icon} style={{ width: 30, height: 30 }} />
                  <Text style={styles.sideHeader}>Temperatura da Água</Text>
                </View>
                <Text style={styles.cell}>{sea?.diario?.manha?.waterTemperature_avg}°c</Text>
                <Text style={styles.cell}>{sea?.diario?.tarde?.waterTemperature_avg}°c</Text>
                <Text style={styles.cell}>{sea?.diario?.noite?.waterTemperature_avg}°c</Text>
              </View>

              {/* Tarde */}
              <View style={styles.row}>
                <View style={[styles.cell, styles.sideHeader]}>
                  <Image source={sea_wave_height} style={{ width: 30, height: 30 }} />
                  <Text style={styles.sideHeader}>Altura de Onda</Text>
                </View>
                <Text style={styles.cell}>{sea?.diario?.manha?.waveHeight_avg} m</Text>
                <Text style={styles.cell}>{sea?.diario?.tarde?.waveHeight_avg} m</Text>
                <Text style={styles.cell}>{sea?.diario?.noite?.waveHeight_avg} m</Text>
              </View>

              {/* Noite */}
              <View style={styles.row}>
                <View style={[styles.cell, styles.sideHeader]}>
                  <Image source={sea_wave_period} style={{ width: 30, height: 30 }} />
                  <Text style={styles.sideHeader}>Intervalo de Onda</Text>
                </View>
                <Text style={styles.cell}>{sea?.diario?.manha?.wavePeriod_avg}'s</Text>
                <Text style={styles.cell}>{sea?.diario?.tarde?.wavePeriod_avg}'s</Text>
                <Text style={styles.cell}>{sea?.diario?.noite?.wavePeriod_avg}'s</Text>
              </View>
            </View>

            <View>

            </View>

            <Text style={{
              fontFamily: 'MontserratSemiBold',
              color: COLORS.TEXT_GRAY,
              fontSize: 12,
              marginBottom: 25
            }}>* Mar do dia resume a previsão de condição do mar feita de hora em hora e agrupa por períodos. As condições reais podem variar dependendo do horário. Principalmente durante a manhã e a noite.</Text>
          </>
        )}



      </ScrollView>

      <SafeAreaView style={{ paddingHorizontal: 20, height: 60, justifyContent: 'center' }}>

        <CustomButton
          backgroundColor={COLORS.BUTTON_FIRST_BACKGROUND}
          onPress={() => navigateToBeachLocalizationMap()}
          title='Visitar'
          titleColor={COLORS.BUTTON_FIRST_TEXT}
        />

      </SafeAreaView>
    </>
  )
})

export default BeachInfoModal