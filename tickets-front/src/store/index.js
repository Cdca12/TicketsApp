import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tickets: [],
    categorias: [],
    categoria: {},
    personal: [],
    persona: {},
    loading: false,
  },
  mutations: {
    SET_TICKETS(state, tickets) {
      state.tickets = tickets;
    },
    SET_CATEGORIAS(state, categorias) {
      state.categorias = categorias;
    },
    SET_PERSONAL(state, personal) {
      state.personal = personal;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    // Tickets
    setTickets({ commit }) {
      axios.get("http://localhost:3000/ticket").then((response) => {
        commit("SET_TICKETS", response.data);
      });
    },

    // Categorías
    setCategorias({ commit }) {
      axios.get("http://localhost:3000/categoria").then((response) => {
        commit("SET_CATEGORIAS", response.data);
      });
    },
    crearCategoria({ commit }, { params, onComplete, onError }) {
      axios
        .post("http://localhost:3000/categoria", params)
        .then(onComplete)
        .catch(onError);
    },
    eliminarCategoria({ commit }, { id, onComplete, onError }) {
      axios
        .delete(`http://localhost:3000/categoria/${id}`)
        .then(onComplete)
        .catch(onError);
    },

    // Personal
    setPersonal({ commit }) {
      axios
        .get("http://localhost:3000/personal")
        .then((res) => commit("SET_PERSONAL", res.data));
    },
	crearPersonal({ commit }, { params, onComplete, onError }) {
		axios.post('http://localhost:3000/personal', params)
		.then(onComplete)
		.catch(onError);
	}
  },
  modules: {},
});
