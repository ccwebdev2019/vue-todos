<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="nav-brand">Todos Web App</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            Home
            <span class="sr-only">(current)</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-if="loginAuthenticated">
        <li class="nav-item active">
          <router-link to="/todos" class="nav-link">Todos</router-link>
        </li>
        <li class="nav-item">
          <span class="nav-link" style="cursor:pointer" v-on:click="logMeOutPlease">Logout</span>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto" v-if="!loginAuthenticated">
        <li class="nav-item active">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "navigation",
  computed: { ...mapState(["login"]), ...mapGetters(["loginAuthenticated"]) },
  methods: {
    ...mapActions(["logUserOut"]),
    logMeOutPlease: function() {
      this.logUserOut();
    }
  },
  watch: {
    loginAuthenticated: function(auth) {
      if (!auth) {
        this.$router.push("login");
      }
    }
  }
};
</script>

<style scoped>
nav {
  background-image: linear-gradient(to right, #00cdac, #8ddad5);
  box-shadow: 0px 0px 5px 1px #cfd9df;
}
</style>
