<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
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
