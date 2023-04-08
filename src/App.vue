<script setup lang="ts">
import SideBar from './components/Sidebar.vue';
import Auth from './api/auth';
import {provide, ref} from 'vue';

const userInfo = ref({username: '未登录'});
Auth.getInfo().then(data => {
  const result = data as UserInfo;
  userInfo.value.username = result.isLogin ? result.data!.username : '未登录';
});
provide('userInfo', userInfo);
</script>

<template>
  <SideBar/>
  <router-view/>
</template>
