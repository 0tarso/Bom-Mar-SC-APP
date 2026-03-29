import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'
import {
  getMessaging,
  getToken,
  onNotificationOpenedApp,
  getInitialNotification,
  setBackgroundMessageHandler,
  subscribeToTopic,
  requestPermission,
} from '@react-native-firebase/messaging'
import { Platform } from 'react-native'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export function useNotifications() {
  useEffect(() => {
    register()
    setupListeners()
  }, [])

  async function register() {
    console.log("Register rodando")
    if (!Device.isDevice) return

    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') return

    const messaging = getMessaging()

    if (Platform.OS === 'ios') {
      await requestPermission(messaging)
    }

    const token = await getToken(messaging)
    console.log('FCM Token:', token)

    // salvar token no seu backend para notificações personalizadas
    // await api.post('/users/token', { token })

    await subscribeToTopic(messaging, 'todas-regioes')
  }

  function setupListeners() {
    const messaging = getMessaging()

    onNotificationOpenedApp(messaging, remoteMessage => {
      handleNavigate(remoteMessage.data)
    })

    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) handleNavigate(remoteMessage.data)
    })

    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log('Background:', remoteMessage)
    })
  }

  function handleNavigate(data: any) {
    if (!data?.screen) return
    // navigationRef.navigate(data.screen, { beachId: data.beachId })
  }
}