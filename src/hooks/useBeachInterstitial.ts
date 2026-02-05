import { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { interstitial } from '@/src/admob/index'
import { Toast } from 'toastify-react-native'

const MODAL_COUNT_KEY = '@beach_modal_open_count'
const SHOW_AD_EVERY = 5

async function incrementModalCount() {
  const value = await AsyncStorage.getItem(MODAL_COUNT_KEY)
  const count = value ? Number(value) + 1 : 1
  await AsyncStorage.setItem(MODAL_COUNT_KEY, String(count))
  return count
}

export function useBeachInterstitial() {
  const maybeShowAd = useCallback(async () => {
    const count = await incrementModalCount()

    if (count % SHOW_AD_EVERY === 0 && interstitial.loaded) {
      try {
        interstitial.show()
      } catch (err) {
        Toast.info('Erro ao exibir anúncio')
      }
    }
  }, [])

  return { maybeShowAd }
}
