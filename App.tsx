//React
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native'

//Expo
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar"

//Screens
import SplashScreen from './src/screens/Splash';


//Routes
import Routes from './src/routes';

//Context
import { UserBeachsProvider } from './src/contexts/UserBeachsContext';

//Components
import { toastConfig } from './src/components/Toast';



export default function App() {

  const [openApp, setOpenApp] = useState(false)

  const [fontsLoaded, error] = useFonts({
    JuliusSansRegular: require('./assets/fonts/JuliusSansOne-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratThin: require('./assets/fonts/Montserrat-Thin.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
  })

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')

    if (fontsLoaded) {
      setTimeout(() => {
        setOpenApp(true)

      }, 1000)
    }

  }, [fontsLoaded])

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
        <ToastManager
          config={toastConfig}
          showProgressBar={true}
          position='top'
          bottomOffset={80}
          duration={10000}
          useModal={false}

        />
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
