<template>
  <div id="app">
    <Navigation />
    <flash-message class="container mt-5 rounded"></flash-message>
    <router-view />
  </div>
</template>

<script>
// imports
import Navigation from "./components/Navigation";
export default {
  components: {
    Navigation
  }
};
</script>

<style>
body {
  font-family: "Dekko", cursive;
  font-size: 100%;
}
</style>
