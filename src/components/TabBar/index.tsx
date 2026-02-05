//React ================================================
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

//COmponents ================================================
import TabItem from '../TabItem'

//Styles ================================================
import { COLORS } from '@/src/Theme/Colors'
import { FontAwesome } from '@expo/vector-icons'

export default function TabBar(props: BottomTabBarProps) {

  return (

    <SafeAreaView style={styles.container} edges={['bottom']}>

      {props.state.routes.map((route, index) => (
        <TabItem
          key={route.key}
          state={props.state}
          navigation={props.navigation}
          descriptors={props.descriptors}
          index={index}
          route={route}
        />
      ))}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.FULL_WHITE,
    paddingBottom: 5,
    // paddingTop: 10,
    elevation: 2,
    zIndex: 20,
    // borderRadius: 50,
    position: 'absolute',
    bottom: 0,

  },
})

