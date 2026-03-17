import React, { useEffect } from 'react'
// import { StatusBar } from "expo-status-bar"

import AppRoutes from './app.routes'

import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../Theme/Colors'
import { useAppVersion } from '../contexts/AppVersionProvider'
import { UpdateModal } from '../components/UpdateModal'

const Routes = () => {
  const { versionData, isForceUpdate, isOptionalUpdate, loading } = useAppVersion();
  useEffect(() => {
    console.log('versionDataa')
    console.log(versionData)
    console.log('force Update: ', isForceUpdate)
    console.log('optional Update: ', isOptionalUpdate)
  }, [versionData])

  return (
    <NavigationContainer>
      <StatusBar translucent style='light' />

      <AppRoutes />
    </NavigationContainer>
  )
}

export default Routes