import { View, Text } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'


const TabHeader = (props: BottomTabHeaderProps) => {
  enum RouteLabel {
    favorites = "Favoritos",
  }

  const routeName = props.route.name as keyof typeof RouteLabel;
  return (
    <View style={{
      width: "100%",
      padding: 20,
      paddingTop: 60,
      backgroundColor: COLORS.FULL_WHITE,
      elevation: 3
    }}>
      <Text style={{
        color: COLORS.BLUE_PRIMARY,
        fontWeight: "700",
        fontSize: 16
      }}>{RouteLabel[routeName]}</Text>
    </View>
  )
}

export default TabHeader