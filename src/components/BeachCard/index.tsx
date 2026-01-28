import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/src/Theme/Colors'

import { FontAwesome } from "@expo/vector-icons"

type Beach = {
  local: string
  praia: string
  situacao: string
  complemento: string
  data_coleta: string
}

interface Props {
  beach: Beach
  onPress: () => void
}

const BeachCard = (props: Props) => {

  const [loading, setLoading] = useState(false)

  const handleLoadingAction = () => {
    setLoading(true)

    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <View style={[
      styles.container,
      (props.beach.situacao === "IMPRÓPRIA") && { borderColor: COLORS.RED_CAUTION }
    ]}>

      <TouchableOpacity style={{
        position: 'absolute',
        right: 10,
        top: 10,
        // backgroundColor: "black",
        padding: 10,
        zIndex: 9
      }}
        onPress={props.onPress}
        onPressOut={() => handleLoadingAction()}
        hitSlop={10}
      >

        {loading ? (
          <ActivityIndicator size={20} color={COLORS.BLUE_PRIMARY} />
        ) : (

          <View>

            {props.beach.favorite ? (
              <FontAwesome
                name="heart"
                color={COLORS.BLUE_ENABLE}
                size={26}
              />

            ) : (

              <FontAwesome
                name="heart-o"
                color={COLORS.BLUE_ENABLE}
                size={26}
              />
            )}

          </View>

        )}
      </TouchableOpacity>
      <Text style={styles.praia}>{props.beach.praia}</Text>
      <Text style={styles.complemento}>{props.beach.complemento}</Text>
      <Text style={styles.dataColeta}>Última coleta: {props.beach.data_coleta}</Text>
    </View>
  )
}

export default BeachCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.FULL_WHITE,
    borderColor: COLORS.BLUE_PRIMARY,
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,

  },
  praia: {
    color: COLORS.BLUE_PRIMARY,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1
  },
  complemento: {
    color: COLORS.BLUE_PRIMARY,
    letterSpacing: -0.2,
    maxWidth: 250,
    fontSize: 12,
    fontWeight: "600"
  },
  dataColeta: {
    color: COLORS.BLUE_PRIMARY,
    fontWeight: "bold",
    marginTop: 10
  }
})