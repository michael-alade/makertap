import user from './user.action'
import video from './video.action'

const actions = {
  hideNavbar ({ commit }, payload) {
    return commit('hideNavbar', payload)
  },
  ...user,
  ...video
}

export default actions
