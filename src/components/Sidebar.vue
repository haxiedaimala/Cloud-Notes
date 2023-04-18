<script setup lang="ts">
import Avatar from './Avatar.vue';
import {useAuthStore} from '../store/auth';

const authStore = useAuthStore();
const onLogout = () => authStore.logout();
</script>

<template>
  <div class="sidebar">
    <Avatar/>
    <div class="icons">
      <router-link to="/note" title="笔记">
        <i class="iconfont icon-note"/>
      </router-link>
      <router-link to="/notebooks" title="笔记本">
        <i class="iconfont icon-notebook"/>
      </router-link>
      <router-link to="/trash" title="回收站">
        <i class="iconfont icon-trash"/>
      </router-link>
    </div>
    <div class="logout" @click="onLogout">
      <i class="iconfont icon-logout"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;

  .icons {
    margin-top: 16px;

    a {
      padding: 6px 0;
      display: block;

      &.router-link-active {
        background-color: #5e6266;
      }
    }
  }

  .logout {
    position: absolute;
    bottom: 24px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }

  .iconfont {
    color: #fff;
  }
}
</style>