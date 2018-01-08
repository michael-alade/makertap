import axios from '../modules/api'
import { setCookie } from '../modules'
let user = {}

user.getCurrentUser = ({ commit }) => {
  return axios.get('/me')
    .then((res) => {
      commit('setCurrentUser', res.data)
      return res
    })
}

user.signup = ({ commit }, payload) => {
  return axios.post('/api/user/signup', payload).then((res) => {
    setCookie('mktoken', res.data.token, 60)
    return res
  })
}

user.login = ({ commit }, payload) => {
  return axios.post('/api/user/login', payload).then((res) => {
    setCookie('mktoken', res.data.token, 60)
    return res
  })
}

export default user
