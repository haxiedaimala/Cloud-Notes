<script setup lang="ts">
import Auth from '../api/auth';
import {useRouter} from 'vue-router';

const router = useRouter();
Auth.getInfo().then(data => {
  let result = data as UserInfo;
  if (!result.isLogin) {
    router.push({path: '/login'});
  }
});
</script>

<template>
  <div>NotebookList.vue</div>
</template>

<style lang="scss" scoped>
</style>