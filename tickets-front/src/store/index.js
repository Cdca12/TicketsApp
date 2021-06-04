import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tickets: [],
		loading: false,
	},
	mutations: {
		SET_TICKETS(state, tickets) {
			state.tickets = tickets;
		},
		SET_LOADING(state, payload) {
			state.loading = payload;
		},
	},
	actions: {
		setTickets({ commit }) {
			axios.get("http://localhost:3000/ticket").then((response) => {
				commit("SET_TICKETS", response.data).finally(() =>
					commit("SET_LOADING", false)
				);
			});
		},
	},
	modules: {},
});
