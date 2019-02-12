<template>
  <div class="container my-5">
    <Response v-bind:response="login" v-bind:show="server"/>
    <ul class="list-group" v-if="errors.length">
      <li style="list-style: none" v-for="(error, index) in errors" v-bind:key="index">
        <div class="alert alert-danger" role="alert">{{error}}</div>
      </li>
    </ul>
    <form v-on:submit="logMeIn" novalidate>
      <div class="form-row align-items-center">
        <div class="col-sm-12 col-md-5">
          <label class="sr-only" for="inlineFormInputGroup">Email</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-envelope"></i>
              </div>
            </div>
            <input type="email" v-model="email" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="col-sm-12 col-md-5">
          <label class="sr-only" for="inlineFormInputGroup">Password</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-key"></i>
              </div>
            </div>
            <input type="password" v-model="password" class="form-control" placeholder="Password">
          </div>
        </div>
        <div class="col-sm-12 col-md-2">
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Response from "../components/Response";
export default {
  name: "login",
  components: {
    Response
  },
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      server: false
    };
  },
  computed: {
    ...mapState(["login"]),
    ...mapGetters(["loginSuccess"])
  },
  methods: {
    ...mapActions(["loginUser"]),
    logMeIn: function(e) {
      e.preventDefault();
      const emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi;
      const passwordReg = /\w{6,}/;
      if (!this.email) {
        return this.errors.push("Hey, we need an email :)");
      } else if (!emailReg.test(this.email)) {
        return (this.errors = ["Email format example: john@example.com"]);
      } else {
        this.errors = [];
      }
      if (!this.password) {
        return this.errors.push("Hey, we need your password :)");
      } else if (!passwordReg.test(this.password)) {
        return this.errors.push("Hey, password must be ate least 6 characters");
      } else {
        this.errors = [];
      }
      this.loginUser({ email: this.email, password: this.password });
      this.email = "";
      this.password = "";
      this.server = true;
      this.hideComponentResponse();
    },
    hideComponentResponse: function() {
      setTimeout(() => {
        this.server = false;
        if (this.loginSuccess) {
          this.$router.push("todos");
        }
      }, 2500);
    }
  }
};
</script>

