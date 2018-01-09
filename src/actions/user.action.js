import axios from '../modules/api'
import { setCookie, getCookie } from '../modules'
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
    axios.post('/api/user/channel', {}, {
      headers: {
        'Authorization': `Bearer ${res.data.token}`
      }
    })
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

user.getUser = ({ commit }, username) => {
  return axios.get(`/api/user/${username}`).then(res => {
    commit('pageProfile', res.data.user)
    return res
  })
}

user.updateChannel = ({ commit }, payload) => {
  const token = getCookie('mktoken')
  return axios.put(`/api/user/channel/${payload.channelId}`, payload, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export default user
