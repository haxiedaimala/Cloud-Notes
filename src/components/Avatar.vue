<script setup lang="ts">
import {computed, inject, Ref} from 'vue';

const userInfo = inject<Ref<{ username: string }>>('userInfo')!;
const username = computed(() => userInfo.value.username);
const slug = computed(() => username.value.charAt(0));
</script>

<template>
  <span :title="username">{{ slug }}</span>
</template>

<style lang="scss" scoped>
span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  background-color: #f2b81c;
  margin: 16px auto 0;
  text-transform: uppercase;
}
</style>