export const state = () => ({
  counter: 0,
  dark: true,
  scrollLocation: undefined,
  windowwidth: 0,
  loggedIn: false,
  user: null,
  message: null,
});

export const getters = {  
}

export const mutations = {
  increment(state) {
    state.counter++;
  },
  saveScrollLocation(state, scroll) {
    state.scrollLocation = scroll;
  },
  dark(state) {
    state.dark = !state.dark;
  },
  windowwidth(state, width) {
    state.windowwidth = width;
  },
  SET_USER(state, user) {
    if (user) {
      state.loggedIn = true;
      state.user = user;
    } else {
      state.loggedIn = false;
      state.user = null;
    }
  },
  SET_MESSAGE(state, message){
    state.message = message;
  },
  CLEAR_MESSAGE(state){
    state.message = null;
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    console.log("nuxtServerInit", req.session.authToken);
    if (req.session.authToken) {
      const data = await app.$axios.$get("/api/auth/users/me/");
      commit("SET_USER", data);
    } else {
      commit("SET_USER", null);
    }
  },
  async login({ commit }, data) {    
    commit("SET_USER", data);
  },
  
  logout({ commit }) {
    this.$axios.$post("/auth/logout/");
    commit("SET_USER", null);
  },
  async activate({ commit }, details) {
    await this.$axios.$post("/api/users/activation/", details);
    const data = await this.$axios.$get("/api/auth/users/me/");
    commit("SET_USER", data);
  }
};
