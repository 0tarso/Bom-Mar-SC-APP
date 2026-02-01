//React ================================================
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'


//Assets ================================================
import beachBackground from "@/assets/beach_background.png"

//Styles ================================================
import { styles } from './styles'
import { COLORS } from '@/src/Theme/Colors'

//Compontes ================================================
import { CustomModal } from '../CustomModal'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import InfoModal from '../InfoModal'


const HomeHero = () => {

  const [showModal, setShowModal] = useState(false)

  // useEffect(() => {
  //   setShowModal(true)
  // }, [])

  return (
    <>
      <TouchableOpacity style={styles.infoButton}
        onPress={() => setShowModal(true)}
      >
        <FontAwesome5 name="info-circle" size={24} color={COLORS.BLUE_ENABLE} />
      </TouchableOpacity>

      <View style={styles.container}>

        <CustomModal
          visible={showModal}
          onClose={() => setShowModal(false)}
        >
          <InfoModal />

        </CustomModal>

        <Text style={styles.text}>Vem aproveitar</Text>


        <Text style={styles.title}>SANTA CATARINA!</Text>

        {/* <View style={{ borderColor: "red", borderWidth: 3, padding: 5, width: '100%' }}>
          <Image source={logoTextSC} style={{ width: "100%", resizeMode: 'contain', aspectRatio: 1 }} />
        </View> */}

        <Image
          source={beachBackground}
          style={{
            position: 'absolute',
            opacity: 0.8
          }}
        />

      </View>


    </>
  )
}

export default HomeHero