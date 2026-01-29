import { View, Text, Image } from 'react-native'
import React from 'react'

import bom_mar_logo from "@/assets/logoTextSC.png"
import { COLORS } from '@/src/Theme/Colors'

const InfoModal = () => {
  return (

    <View style={{
      // flex: 1,
      // justifyContent: "center",
      alignItems: 'center',
      // backgroundColor: "green",
      // padding: 20
    }}>
      <Image
        style={{
          width: 200,
          resizeMode: 'contain',
          height: 100
        }}
        source={bom_mar_logo}
      />
      <Text style={{
        fontWeight: "600",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'center'
      }}>Bom Mar Sc foi desenvolvido para informar de forma clara e acessível a balneabilidade das praias de Santa Catarina.

      </Text>
      <Text style={{
        fontWeight: "600",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'center'
      }}>
        Os dados apresentados são fornecidos pelo Instituto do Meio Ambiente de Santa Catarina (IMA).
        O objetivo do app é facilitar o acesso às informações, ajudando o usuário a verificar rapidamente se a praia está própria ou imprópria para banho.
      </Text>
    </View>

  )
}

export default InfoModal