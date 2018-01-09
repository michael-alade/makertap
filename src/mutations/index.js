const mutations = {
  hideNavbar: (state, payload) => {
    state.hideNavbar = payload
  },
  searchVideos: (state, payload) => {
    state.videos = payload
  },
  pageProfile: (state, payload) => {
    state.pageProfile = payload
  },
  searchLoading: (state, payload) => {
    state.videoSearchLoading = payload
  }
}

export default mutations
