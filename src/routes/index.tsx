import React from 'react'
// import { StatusBar } from "expo-status-bar"

import AppRoutes from './app.routes'

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'react-native'

const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />

      <AppRoutes />
    </NavigationContainer>
  )
}

export default Routes