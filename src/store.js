import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    login: { authenticated: false, message: "", success: "" },
    register: { message: "", success: "" }
  },
  getters: {
    loginAuthenticated: state => {
      return state.login.authenticated;
    }
  },
  mutations: {
    ADD_TODO: (state, payload) => {
      state.todos.push(payload);
    },
    EDIT_SINGLE_TODO: (state, payload) => {
      state.todos[payload.i].todo = payload.t;
    },
    REMOVE_TODO: (state, payload) => {
      state.todos.splice(payload, 1);
    },
    LOGIN_USER: (state, payload) => {
      state.login.authenticated = payload.data.success;
      state.login.success = payload.data.success;
      state.login.message = payload.data.message;
    },
    LOGIN_USER_ERROR: (state, payload) => {
      state.login.authenticated = payload.data.success;
      state.login.success = payload.data.success;
      state.login.message = payload.data.message;
    },
    REGISTER_USER: (state, payload) => {
      state.register.success = payload.data.success;
      state.register.message = payload.data.message;
    },
    REGISTER_USER_ERROR: (state, payload) => {
      state.register.success = payload.data.success;
      state.register.message = payload.data.message;
    },
    LOG_USER_OUT: state => {
      state.login.authenticated = false;
      state.login.success = "";
      state.login.message = "";
    }
  },
  actions: {
    addTodo: (context, payload) => {
      context.commit("ADD_TODO", payload);
    },
    editSingleTodo: (context, payload) => {
      context.commit("EDIT_SINGLE_TODO", payload);
    },
    removeTodo: (context, payload) => {
      context.commit("REMOVE_TODO", payload);
    },
    loginUser: (context, payload) => {
      axios
        .post("/auth/login", payload)
        .then(response => context.commit("LOGIN_USER", response))
        .catch(e => context.commit("LOGIN_USER_ERROR", e.response));
    },
    registerUser: (context, payload) => {
      axios
        .post("/auth/create", payload)
        .then(response => context.commit("REGISTER_USER", response))
        .catch(e => context.commit("REGISTER_USER_ERROR", e.response));
    },
    logUserOut: context => {
      context.commit("LOG_USER_OUT");
    }
  }
});
