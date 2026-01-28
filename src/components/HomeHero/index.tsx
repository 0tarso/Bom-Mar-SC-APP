import { View, Text, Image as ImageReact } from 'react-native'
import React from 'react'
import Svg, { ClipPath, Defs, Image, Path } from 'react-native-svg'



import beachBackground from "@/assets/beach_background.png"
import logoSC from "@/assets/logoSC.png"

import { COLORS } from '@/src/Theme/Colors'

const HomeHero = () => {
  return (
    <>
      <View style={{
        backgroundColor: COLORS.FULL_WHITE,
        position: 'absolute',
        zIndex: 20,
        bottom: 10,
        left: 20,
        padding: 20,
        borderTopRightRadius: 30,
        borderRadius: 10,
        elevation: 10
      }}>
        <Text style={{
          fontSize: 16,
          color: COLORS.BLUE_PRIMARY
        }}>Vem aproveitar</Text>


        <Text style={{
          fontSize: 26,
          fontWeight: "800",
          color: COLORS.BLUE_PRIMARY,
          letterSpacing: 1.5
        }}>SANTA CATARINA!</Text>

        <View style={{
          position: 'absolute',
          right: 10,
          top: -30,
          width: 80,
          height: "auto",
          zIndex: 20
        }}>
          <ImageReact source={logoSC} style={{ aspectRatio: 1, width: '100%', height: "100%", resizeMode: 'contain' }} />
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