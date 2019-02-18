<template>
  <!-- todos main container -->
  <div class="container my-5">
    <!-- errors ul -->
    <ul class="list-group" v-if="errors.length">
      <li
        v-for="(error, index) in errors"
        v-bind:key="index"
        style="list-style: none"
      >
        <div class="alert alert-danger" role="alert">{{ error }}</div>
      </li>
    </ul>
    <!-- add todos form -->
    <form v-on:submit="createTodo" v-if="!edit">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="todo"
          placeholder="write your todo here"
        />
      </div>
      <div class="form-group">
        <input type="submit" value="upload" class="btn btn-success" />
      </div>
    </form>
    <!-- edit/update todo form -->
    <form v-on:submit="updateTodo" v-if="edit">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="todo"
          placeholder="write your todo here"
        />
      </div>
      <div class="form-group">
        <input type="submit" value="update" class="btn btn-primary" />
        <button type="button" class="btn btn-warning" v-on:click="cancelEdit">
          cancel update
        </button>
      </div>
    </form>
    <!-- display todos container -->
    <div v-if="todos.length">
      <p class="lead">Your Todo List</p>
      <ul class="list-group">
        <li
          class="list-group-item my-2 bg-light d-flex justify-content-between"
          v-for="(t, index) in todos"
          v-bind:key="index"
        >
          {{ t.todo }}
          <span class="text-info">{{ t.created }}</span>
          <div>
            <i
              class="far fa-edit mx-2 text-primary pointer"
              v-on:click="editTodo(t.todo, index)"
            ></i>
            <i
              class="far fa-times-circle mx-2 text-danger pointer"
              v-on:click="deleteTodo(index)"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// imports
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
      // dont add empty todo
      if (!this.todo) {
        return this.errors.push("Write a todo then click upload");
      }
      this.errors = [];
      // if not errors dispatch action to add a todo
      this.addTodo({ todo: this.todo, created: new Date().toLocaleString() });
      // set todos to an empty string again
      this.todo = "";
    },
    updateTodo: function(e) {
      e.preventDefault();
      // on click update, disptach action to update todo
      this.editSingleTodo({ t: this.todo, i: this.index });
      this.todo = "";
      this.id = "";
      this.edit = false;
    },
    editTodo: function(t, i) {
      // on click on edit icon set todo and index properties to the respective params values and show edit form
      this.todo = t;
      this.index = i;
      this.edit = true;
    },
    cancelEdit: function() {
      // on cancel update click button, set properties to empty strings and hide form
      this.todo = "";
      this.index = "";
      this.edit = false;
    },
    deleteTodo: function(id) {
      // on click delete icon dispatch delete action
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
