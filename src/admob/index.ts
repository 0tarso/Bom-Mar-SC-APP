import { InterstitialAd, TestIds } from 'react-native-google-mobile-ads'
import Constants from 'expo-constants'

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Constants.expoConfig?.extra?.ADS_TEST_ID

export const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
})
