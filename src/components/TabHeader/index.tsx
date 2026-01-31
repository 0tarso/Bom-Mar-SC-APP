import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '@/src/Theme/Colors'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'


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


const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.BLUE_PRIMARY,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25
    // elevation: 3
  },
  text: {
    color: COLORS.FULL_WHITE,
    // fontWeight: "700",
    fontSize: 16,
    fontFamily: "MontserratSemiBold"
  }
})