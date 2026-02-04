//React ================================================
import { View, Text } from 'react-native'
import React from 'react'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'

//Styles ================================================
import { styles } from './styles'

const TabHeader = (props: BottomTabHeaderProps) => {
  enum RouteLabel {
    favorites = "Praias Favoritas",
    home = ""
  }

  const routeName = props.route.name as keyof typeof RouteLabel;
  return (
    <View style={styles.container}>

      {RouteLabel[routeName] === "Praias Favoritas" && (
        <Text style={styles.text}>{RouteLabel[routeName]}</Text>
      )}


    </View>
  )
}

export default TabHeader

