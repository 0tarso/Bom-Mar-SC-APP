import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomModal } from '../CustomModal'
import { COLORS } from '@/src/Theme/Colors'
import { WeatherAlert } from '@/src/types'
import { styles } from './styles'
import { FontAwesome } from '@expo/vector-icons'

const AlertWeatherModal = ({ props }: { props: WeatherAlert }) => {
  const { height } = Dimensions.get('window')
  const [isVisible, setIsVisible] = useState(false)

  return (
    <View style={[styles.buttonContainer, {
      top: height - 100,
    }]}>

      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={styles.button}
      >
        <FontAwesome name='warning' size={14} color={"#fff"} />
        <Text style={{
          fontFamily: 'MontserratBold',
          color: '#fff',
        }}>Alerta</Text>
      </TouchableOpacity>

      <CustomModal
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        title='Alerta INMET'
        headerBackgroundColor={COLORS.RED_CAUTION}
      >
        <ScrollView
        >

          <View
            style={{
              paddingHorizontal: 10,

            }}
          >
            <Text style={[styles.title, { textAlign: 'center', marginTop: 24, fontSize: 24 }]}>{props.descricao}</Text>
            <Text style={[styles.complemento, { textAlign: 'center' }]}>Região: {props.regioes}</Text>

            <View style={{
              marginTop: 12,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}>
              <View style={{}}>
                <Text style={styles.alertPeriod}
                >Início
                </Text>
                <Text style={styles.alertDate}>{new Date(props.data_inicio).toLocaleString('pt-br').slice(0, 10)}</Text>
              </View>
              <View style={{}}>
                <Text style={styles.alertPeriod}
                >Fim
                </Text>
                <Text style={styles.alertDate}>{new Date(props.data_fim).toLocaleString('pt-br').slice(0, 10)}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>

              <View style={{}}>
                <Text style={[styles.title, { fontSize: 16 }]}>Riscos</Text>
                <Text style={{}}>{props.riscos}</Text>
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={[styles.title, { fontSize: 16 }]}>Instruções</Text>
                <Text style={{}}>{props.instrucoes}</Text>
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={[styles.title, { fontSize: 16 }]}>Estados</Text>
                <Text style={{}}>{props.estados}</Text>
              </View>
            </View>
          </View>

        </ScrollView>
      </CustomModal>
    </View>
  )
}

export default AlertWeatherModal