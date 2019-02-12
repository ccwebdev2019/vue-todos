<template>
  <div class="container my-5">
    <ul class="list-group" v-if="errors.length">
      <li v-for="(error, index) in errors" v-bind:key="index" style="list-style: none">
        <div class="alert alert-danger" role="alert">{{error}}</div>
      </li>
    </ul>
    <form v-on:submit="createTodo" v-if="!edit">
      <div class="form-group">
        <input type="text" class="form-control" v-model="todo" placeholder="write your todo here">
      </div>
      <div class="form-group">
        <input type="submit" value="upload" class="btn btn-success">
      </div>
    </form>
    <form v-on:submit="updateTodo" v-if="edit">
      <div class="form-group">
        <input type="text" class="form-control" v-model="todo" placeholder="write your todo here">
      </div>
      <div class="form-group">
        <input type="submit" value="update" class="btn btn-primary">
      </div>
    </form>
    <div v-if="todos.length">
      <p class="lead">Your Todo List</p>
      <ul class="list-group">
        <li
          class="list-group-item my-2 bg-light d-flex justify-content-between"
          v-for="(t, index) in todos"
          v-bind:key="index"
        >
          {{t.todo}}
          <span class="text-info">{{t.created}}</span>
          <div>
            <i class="far fa-edit mx-2 text-primary pointer" v-on:click="editTodo(t.todo, index)"></i>
            <i class="far fa-times-circle mx-2 text-danger pointer" v-on:click="deleteTodo(index)"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "todos",
  data() {
    return {
      todo: "",
      errors: [],
      edit: false,
      index: ""
    };
  },
  computed: { ...mapState(["todos"]) },
  methods: {
    ...mapActions(["addTodo", "editSingleTodo", "removeTodo"]),
    createTodo: function(e) {
      e.preventDefault();
      if (!this.todo) {
        return this.errors.push("Write a todo then click upload");
      }
      this.errors = [];
      this.addTodo({ todo: this.todo, created: new Date().toLocaleString() });
      this.todo = "";
    },
    updateTodo: function(e) {
      e.preventDefault();
      this.editSingleTodo({ t: this.todo, i: this.index });
      this.todo = "";
      this.id = "";
      this.edit = false;
    },
    editTodo: function(t, i) {
      this.todo = t;
      this.index = i;
      this.edit = true;
    },
    deleteTodo: function(id) {
      this.removeTodo(id);
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
