import axios from 'axios'
import config from './config'

let axiosInstance = axios.create({
  baseURL: config.api
  /* other custom settings */
})

export default axiosInstance
