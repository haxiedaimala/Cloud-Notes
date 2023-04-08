<script setup lang="ts">
import {inject, Ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const userInfo = inject<Ref<{ username: string }>>('userInfo')!;
if (userInfo.value.username === '未登录') {
  router.push({path: '/login'});
}
</script>

<template>
  <div>TrashDetail.vue</div>
  <h1>{{ $route.params.noteId }}</h1>
</template>

<style lang="scss" scoped>
</style>