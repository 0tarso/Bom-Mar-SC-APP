import { View, Text } from 'react-native'
import React from 'react'
import AppRoutes from './app.routes'

import { NavigationContainer } from "@react-navigation/native"

const Routes = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}

export default Routes