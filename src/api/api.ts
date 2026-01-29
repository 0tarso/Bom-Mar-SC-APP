import axios from 'axios'
import Constants from 'expo-constants'
import * as SecureStore from 'expo-secure-store'

const baseURL = Constants?.expoConfig?.extra?.API_URL ?? undefined
const secret = Constants?.expoConfig?.extra?.API_SECRET_KEY

// console.log(baseURL)
// console.log(secret)

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": secret
  }
})




export default api