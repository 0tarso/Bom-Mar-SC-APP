import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import Routes from './src/routes';
import { useEffect, useState } from 'react';
import SplashScreen from './src/screens/Splash';


export default function App() {

  const [openApp, setOpenApp] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setOpenApp(true)
    }, 2000)
  })

  if (!openApp) {
    return (

      <>
        <SplashScreen />
      </>

    )
  }

  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
