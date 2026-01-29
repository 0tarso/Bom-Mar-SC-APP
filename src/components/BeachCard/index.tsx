import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/src/Theme/Colors'

import { FontAwesome } from "@expo/vector-icons"
import { Beach } from '@/src/types'
import { styles } from "./styles"

interface Props {
  beach: Beach
  onPress: () => void
}

const BeachCard = (props: Props) => {

  const [loading, setLoading] = useState(false)

  const timeoutLoadingAction = () => {
    setLoading(true)

    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <View style={[
      styles.container,
      (props.beach.situacao === "IMPRÓPRIA") && { borderColor: COLORS.RED_CAUTION }
    ]}>

      <TouchableOpacity style={styles.buttonContainer}
        onPress={props.onPress}
        onPressOut={() => timeoutLoadingAction()}
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
      <Text style={styles.dataColeta}>Última análise: {props.beach.data_coleta}</Text>
    </View>
  )
}

export default BeachCard
