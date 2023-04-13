<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';

validLogin();
</script>

<template>
  <div>NoteDetail.vue</div>
  <h1>notebookId:{{ $route.query.notebookId }}</h1>
  <h1>noteId：{{ $route.query.noteId }}</h1>
</template>

<style lang="scss" scoped>
</style>