import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
import { useEffect, useState } from 'react';
import SplashScreen from './src/screens/Splash';
import * as NavigationBar from "expo-navigation-bar"
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserBeachsProvider } from './src/contexts/UserBeachsContext';

export default function App() {

  const [openApp, setOpenApp] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setOpenApp(true)
    }, 2000)

    NavigationBar.setVisibilityAsync('hidden')
  })

  if (!openApp) {
    return (

      <>
        <SplashScreen />
      </>

    )
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <UserBeachsProvider>

        <Routes />
      </UserBeachsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
