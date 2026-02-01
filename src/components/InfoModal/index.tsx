//React ================================================
import { View, Text, Image } from 'react-native'
import React from 'react'

//Assets ================================================
import bom_mar_logo from "@/assets/logoTextSC.png"


//Styles ================================================
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
        fontWeight: "800",
        width: "100%",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'left',
        fontSize: 16
      }}>Sobre
      </Text>
      <Text style={{
        fontWeight: "600",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'left'
      }}>Bom Mar Sc foi desenvolvido para informar de forma clara e acessível a balneabilidade das praias de Santa Catarina.{'\n'}

      </Text>
      <Text style={{
        fontWeight: "600",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'left'
      }}>
        Os dados apresentados são fornecidos pelo Instituto do Meio Ambiente de Santa Catarina (IMA).
        O objetivo do app é facilitar o acesso às informações, ajudando o usuário a verificar rapidamente se a praia está própria ou imprópria para banho.{'\n'}
      </Text>
      <Text style={{
        fontWeight: "800",
        width: "100%",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'left',
        fontSize: 16
      }}>Uso da Localização
      </Text>
      <Text style={{
        fontWeight: "600",
        color: COLORS.CARD_TEXT_PRIMARY,
        textAlign: 'left'
      }}>A localização do usuário é utilizada exclusivamente dentro do aplicativo para melhorar a experiência, como facilitar a visualização de praias próximas.
        Nenhum dado de localização é armazenado, compartilhado ou enviado a terceiros.{'\n'}

      </Text>
    </View>

  )
}

export default InfoModal