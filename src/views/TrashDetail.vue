<script setup lang="ts">
import {onBeforeMount} from 'vue';
import {useAuthStore} from '../store/auth';

const authStore = useAuthStore();
onBeforeMount(() => {
  authStore.checkLogin();
});
</script>

<template>
  <div>TrashDetail.vue</div>
  <h1>{{ $route.query.noteId }}</h1>
</template>

<style lang="scss" scoped>
</style>