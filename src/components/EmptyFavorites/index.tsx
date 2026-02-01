//React ================================================
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

//Styles ================================================
import { COLORS } from '@/src/Theme/Colors'
import { styles } from './styles'


//Assets ================================================
import empty_animation from "@/assets/animations/empty_favorites_animation.json"

//Hooks ================================================
import { useNavigation } from '@react-navigation/native'

const EmptyFavorites = () => {
  const navigation = useNavigation()


  return (
    <View style={styles.container}>

      <Text style={styles.stText}>Cadê suas</Text>
      <Text style={styles.ndText}>FAVORITAS</Text>
      <Text style={styles.rdText}>HEIN!?</Text>

      <View style={styles.animationContainer}>
        <LottieView
          source={empty_animation}
          autoPlay
          style={styles.animation}
        />


      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('home')}
        style={{
          backgroundColor: COLORS.BLUE_PRIMARY,
          alignItems: 'center',
          padding: 8,
          borderRadius: 10,
          marginTop: 30,
          elevation: 5
        }}
      >
        <Text style={{
          fontFamily: "MontserratSemiBold",
          color: COLORS.TEXT_WHITE,
          fontSize: 16,

        }}>Adicionar favorita</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyFavorites