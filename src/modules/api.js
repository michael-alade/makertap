import axios from 'axios'

let axiosInstance = axios.create({
  baseURL: process.env.API_URL
  /* other custom settings */
})

export default axiosInstance
