<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';
import NoteSidebar from '../components/NoteSidebar.vue';

validLogin();
</script>

<template>
  <div class="layout">
    <NoteSidebar/>
    <div class="note-detail">
      <div>NoteDetail.vue</div>
      <h1>notebookId:{{ $route.query.notebookId }}</h1>
      <h1>noteId：{{ $route.query.noteId }}</h1>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  flex: 1;
  display: flex;

  .note-detail {
    flex: 1;
    background-color: #fff;
  }
}
</style>