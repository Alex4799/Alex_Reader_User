import { createStore } from 'vuex'

export default createStore({
  state: {
    header:{
      Authorization:'',
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    user:{},
  },
  getters: {
    getToken:(state)=>state.header,
    getUser:(state)=>state.user,
  },
  mutations: {
  },
  actions: {
    setToken: ({state},value) => {
      state.header.Authorization='Bearer '+ value;
    },
    setUser: ({state},value) => {
      state.user=value;
    }
  },
  modules: {
  }
})
