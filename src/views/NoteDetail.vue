<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';

validLogin();
</script>

<template>
  <div>NoteDetail.vue</div>
  <h1>{{ $route.params.noteId }}</h1>
</template>

<style lang="scss" scoped>
</style>