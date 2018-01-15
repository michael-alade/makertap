import axios from '../modules/api'

const videos = {}

videos.search = ({ commit }, payload) => {
  let url = '/api/live/search?'
  if (payload && payload.input) {
    url += `query=${payload.input}`
  }

  if (payload && payload.interests) {
    url += `categories=${payload.interests.join()}`
  }

  return axios.get(url).then(res => {
    commit('searchLoading', false)
    return commit('searchVideos', res.data)
  })
}

export default videos
