import axios from '../modules/api'

const videos = {}

videos.search = ({ commit }, payload) => {
  let url = '/api/live/search?'
  if (payload && payload.input) {
    url += `query=${payload.input}`
  }
  return axios.get(url).then(res => {
    return commit('searchVideos', res.data)
  })
}

export default videos
