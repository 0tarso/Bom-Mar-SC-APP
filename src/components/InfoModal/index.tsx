//React ================================================
import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

//Assets ================================================
import bom_mar_logo from "@/assets/logoTextSC.png"


//Styles ================================================
import { COLORS } from '@/src/Theme/Colors'
import { styles } from './styles'

const InfoModal = () => {
  return (

    <ScrollView style={{
      padding: 20,
    }}>

      <View style={[styles.card, { width: "50%", marginTop: 30 }]}>
        <Image
          style={{
            width: "100%",
            resizeMode: 'contain',
            height: 50
          }}
          source={bom_mar_logo}
        />

      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Sobre</Text>
        <Text style={styles.text}>Bom Mar Sc foi desenvolvido para informar de forma clara e acessível a balneabilidade das praias de Santa Catarina.{'\n'}
        </Text>
        <Text style={styles.text}>
          Os dados apresentados são fornecidos pelo Instituto do Meio Ambiente de Santa Catarina (IMA).
          O objetivo do app é facilitar o acesso às informações, ajudando o usuário a verificar rapidamente se a praia está própria ou imprópria para banho.{'\n'}

        </Text>
      </View>


      <View style={styles.card}>
        <Text style={styles.title}>Uso da Localização</Text>
        <Text style={styles.text}>A localização do usuário é utilizada exclusivamente dentro do aplicativo para melhorar a experiência, como facilitar a visualização de praias próximas e calcular a rota de viagem.{'\n'}
        </Text>

      </View>

      <View style={styles.card}>

        <Text style={styles.title}>Condições atuais</Text>
        <Text style={styles.text}>Essa funcionalidade reflete as condições no momento em que se utiliza o aplicativo, sendo atualizada a cada abertura do mesmo.{'\n'}</Text>

        <Text style={styles.title}>Mar do Dia</Text>
        <Text style={styles.text}>As medições não representam um ponto exato da praia, mas sim uma estimativa média da região onde ela está localizada. Fatores naturais como correntes, ventos locais, marés e relevo costeiro podem causar variações ao longo do dia ou entre praias próximas.</Text>

      </View>

    </ScrollView>

  )
}

export default InfoModal