import { View, Text, Image as ImageReact, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Svg, { ClipPath, Defs, Image, Path } from 'react-native-svg'



import beachBackground from "@/assets/beach_background.png"
import logoSC from "@/assets/logoSC.png"

import { styles } from './styles'
import { CustomModal } from '../CustomModal'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { COLORS } from '@/src/Theme/Colors'
import InfoModal from '../InfoModal'
const HomeHero = () => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <TouchableOpacity style={{
        position: 'absolute',
        zIndex: 20,
        right: 10,
        top: 10,
        padding: 5,
        backgroundColor: "#fafafa",
        borderRadius: 50
      }}
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

        <View style={styles.imageContainer}>
          <ImageReact source={logoSC} style={styles.image} />
        </View>

      </View>

      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 360 240"
        preserveAspectRatio="none"
      >
        <Defs>
          <ClipPath id="clip">
            <Path
              d="
              M20 0
              H340
              Q360 0 360 20
              V180
              C270 160 90 220 0 180
              V20
              Q0 0 20 0
              Z
            "
            />
          </ClipPath>
        </Defs>

        <Image
          href={beachBackground}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#clip)"
        />
      </Svg>
    </>
  )
}

export default HomeHero