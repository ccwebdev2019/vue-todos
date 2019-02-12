<template>
  <div
    v-if="show"
    role="alert"
    v-bind:class="{'alert alert-danger': !response.success, 'alert alert-success': response.success}"
  >{{response.message}}</div>
</template>

<script>
export default {
  name: "response",
  props: ["response", "show"]
};
</script>

