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

user.goLive = ({ commit }, channelId) => {
  const token = getCookie('mktoken')
  return axios.post(`/api/live/${channelId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

user.stopLive = ({ commit }, channelId) => {
  const token = getCookie('mktoken')
  return axios.post(`/api/live/stop/${channelId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

user.signup = ({ commit }, payload) => {
  return axios.post('/api/user/signup', payload).then((res) => {
    axios.post('/api/user/channel', {}, {
      headers: {
        'Authorization': `Bearer ${res.data.token}`
      }
    })
    return res
  })
}

user.verifyEmail = ({ commit }, payload) => {
  return axios.post('/api/user/email-verify', { i: payload })
}

user.login = ({ commit }, payload) => {
  return axios.post('/api/user/login', payload).then((res) => {
    if (res.data.emailVerified) {
      setCookie('mktoken', res.data.token, 60)
    }
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

user.subscribe = ({ commit }, payload) => {
  const token = getCookie('mktoken')
  const body = {
    userId: payload.userId
  }
  return axios.put(`/api/user/channel/${payload.channelId}/subscribe`, body, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

user.unsubscribe = ({ commit }, payload) => {
  const token = getCookie('mktoken')
  const body = {
    userId: payload.userId
  }
  return axios.put(`/api/user/channel/${payload.channelId}/unsubscribe`, body, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

user.channelView = (store, channelId) => {
  const token = getCookie('mktoken')
  return axios.put(`/api/user/channel/${channelId}/view`, {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

user.featuredChannel = (store) => {
  return axios.get('/api/featured/channels').then(res => {
    store.state.featuredChannels = res.data.channels
    return res
  })
}

export default user
