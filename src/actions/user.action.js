import axios from 'axios'
let user = {}

user.getCurrentUser = ({ commit }) => {
  return axios.get('http://localhost:3000/me')
    .then((res) => {
      commit('setCurrentUser', res.data)
      return res
    })
}

export default user
