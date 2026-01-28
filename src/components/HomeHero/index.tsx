import { View, Text, Image as ImageReact } from 'react-native'
import React from 'react'
import Svg, { ClipPath, Defs, Image, Path } from 'react-native-svg'



import beachBackground from "@/assets/beach_background.png"
import logoSC from "@/assets/logoSC.png"

import { COLORS } from '@/src/Theme/Colors'
import { styles } from './styles'

const HomeHero = () => {
  return (
    <>
      <View style={styles.container}>
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