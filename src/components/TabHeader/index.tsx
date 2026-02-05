//React ================================================
import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'

//Styles ================================================
import { styles } from './styles'

const TabHeader = (props: BottomTabHeaderProps) => {
  enum RouteLabel {
    favorites = "Praias Favoritas",
    map = "Mapa",
    home = "",
  }

  const routeName = props.route.name as keyof typeof RouteLabel;
  return (
    <>
      {RouteLabel[routeName] === "Mapa" && (
        <View style={[styles.container, { position: 'absolute' }]}>
          <Text style={styles.text}>Praias de Santa Catarina</Text>
        </View>
      )}
      {RouteLabel[routeName] === "Praias Favoritas" && (
        <View style={styles.container}>
          <Text style={styles.text}>Minhas Praias Favoritas</Text>
        </View>
      )}

    </>

  )
}

export default TabHeader

