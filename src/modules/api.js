import axios from 'axios'

let axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
  /* other custom settings */
})

export default axiosInstance
