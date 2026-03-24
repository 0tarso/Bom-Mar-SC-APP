import React, { useEffect } from 'react'
// import { StatusBar } from "expo-status-bar"

import AppRoutes from './app.routes'

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar'

const Routes = () => {

  return (
    <NavigationContainer>
      <StatusBar translucent style='light' />

      <AppRoutes />
    </NavigationContainer>
  )
}

export default Routes