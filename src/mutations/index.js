const mutations = {
  searchVideos: (state, payload) => {
    state.videos = payload
  },
  searchLoading: (state, payload) => {
    state.videoSearchLoading = payload
  }
}

export default mutations
