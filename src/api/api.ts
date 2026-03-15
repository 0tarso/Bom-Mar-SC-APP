import axios from 'axios'
import Constants from 'expo-constants'

const extra =
  Constants.expoConfig?.extra ||
  Constants.manifest?.extra

const baseURL = extra?.API_URL
const secret = extra?.API_SECRET_KEY
// console.log(baseURL)
// console.log(secret)

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "x-api-key": secret
  }
})


export default api