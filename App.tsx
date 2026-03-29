//React
import { StyleSheet, Text, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from 'toastify-react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { useNotifications } from './src/hooks/useNotifications'

//Expo
import { useFonts } from "expo-font";

//Screens
import SplashScreen from './src/screens/Splash';


//Routes
import Routes from './src/routes';

//Context
import { UserBeachsProvider } from './src/contexts/UserBeachsContext';

//Components
import { toastConfig } from './src/components/Toast';
import { AppVersionProvider } from './src/contexts/AppVersionProvider';
import { InternetProvider } from './src/contexts/InternetProvider';
// import { AdEventType } from 'react-native-google-mobile-ads';

//ADMOB
// import { interstitial } from './src/admob';

//@ts-ignore
Text.defaultProps = Text.defaultProps || {};
//@ts-ignore
Text.defaultProps.allowFontScaling = false;

//@ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
//@ts-ignore
TextInput.defaultProps.allowFontScaling = false;

export default function App() {


  const [openApp, setOpenApp] = useState(false)

  const [fontsLoaded, error] = useFonts({
    JuliusSansRegular: require('./assets/fonts/JuliusSansOne-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    MontserratThin: require('./assets/fonts/Montserrat-Thin.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
  })

  useNotifications()
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden')
    NavigationBar.setBehaviorAsync('overlay-swipe')
    if (fontsLoaded) {
      setTimeout(() => {
        setOpenApp(true)

      }, 1000)
    }
  }, [fontsLoaded])

  // Admob effect
  // useEffect(() => {
  //   const unsubscribeLoaded = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       console.log('Interstitial carregado');
  //     }
  //   );

  //   const unsubscribeClosed = interstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       console.log('Interstitial fechado, recarregando...');
  //       interstitial.load();
  //     }
  //   );

  //   interstitial.load();

  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeClosed();
  //   };
  // }, []);


  if (!openApp) {
    return (

      <>
        <SplashScreen />
      </>

    )
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <InternetProvider>
        <AppVersionProvider>
          <UserBeachsProvider>
            <ToastManager
              config={toastConfig}
              // showProgressBar={true}
              position='top'
              bottomOffset={80}
              duration={4000}
              useModal={false}

            />
            <Routes />
          </UserBeachsProvider>
        </AppVersionProvider>
      </InternetProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
