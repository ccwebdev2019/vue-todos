<template>
  <!-- main wrapper container -->
  <div class="container my-5">
    <!-- errors ul -->
    <ul class="list-group" v-if="errors.length">
      <li style="list-style: none" v-for="(error, index) in errors" v-bind:key="index">
        <div class="alert alert-danger" role="alert">{{ error }}</div>
      </li>
    </ul>
    <!-- register form -->
    <form v-on:submit="createUser">
      <div class="form-row align-items-center">
        <div class="col-sm-12">
          <label class="sr-only" for="inlineFormInputGroup">Name</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-user-circle"></i>
              </div>
            </div>
            <input type="text" v-model="name" class="form-control" placeholder="Name">
          </div>
        </div>
        <div class="col-sm-12">
          <label class="sr-only" for="inlineFormInputGroup">Email</label>
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <i class="fas fa-envelope"></i>
              </div>
            </div>
            <input type="text" v-model="email" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="col-sm-12">
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
        <div class="col-sm-12">
          <button type="submit" class="btn btn-primary mb-2">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// imports
import { mapState, mapActions } from "vuex";
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: []
    };
  },
  computed: { ...mapState(["register"]) },
  methods: {
    ...mapActions(["registerUser"]),
    createUser: function(e) {
      e.preventDefault();
      // email regex
      const emailReg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/gi;
      // password regex
      const passwordReg = /\w{6,}/;
      // verify if inputs are not empty and they pass regex
      if (!this.name) {
        return this.errors.push("Hey, we need a name");
      } else {
        this.errors = [];
      }
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
      // if no errors, dispatch action
      this.registerUser({
        name: this.name,
        email: this.email,
        password: this.password
      }).then(() => {
        // on success
        if (this.register.success) {
          // set form properties to empty strings
          this.name = "";
          this.email = "";
          this.password = "";
          // display message on ui
          this.flash(this.register.message, "alert alert-success", {
            timeout: 2000,
            importante: false
          });
        } else {
          // display message on ui
          this.flash(this.register.message, "alert alert-danger", {
            timeout: 2000,
            importante: false
          });
        }
      });
    }
  }
};
</script>
