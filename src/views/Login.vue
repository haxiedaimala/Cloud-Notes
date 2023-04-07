<script setup lang="ts">
import {computed, ref, watchPostEffect} from 'vue';

const isRegister = ref(true);
const userInfo = ref({
  username: '',
  password: '',
  isError: false,
  notice: isRegister.value ? '创建账户后，请记住用户名和密码' : '输入用户名和密码'
});
const title = computed(() => isRegister.value ? '创建账户' : '登录');
watchPostEffect(() => {
  userInfo.value.notice = isRegister.value ? '创建账户后，请记住用户名和密码' : '输入用户名和密码';
});
const onShowRegister = () => isRegister.value = true;
const onShowLogin = () => isRegister.value = false;
const validInfo = () => {
  const result1 = /^[a-zA-Z_\d\u4E00-\u9FA5]{3,15}$/.test(userInfo.value.username);
  const result2 = /^.{6,16}$/.test(userInfo.value.password);
  if (!result1 || !result2) {
    userInfo.value.isError = true;
    userInfo.value.notice = result1 ? '密码长度为6~16个字符' : '用户名必须是3~15个字符，限数字字母下划线中文';
    return false;
  }
  userInfo.value.isError = false;
  userInfo.value.notice = '';
  return true;
};

const onSubmit = () => {
  if (!validInfo()) return;
  if (isRegister.value) {
    //TODO 提交注册信息
    console.log('start register...,username:', userInfo.value.username, 'password:', userInfo.value.password);
  } else {
    //TODO 提交登录信息
    console.log('start login...,username:', userInfo.value.username, 'password:', userInfo.value.password);
  }
};
</script>

<template>
  <div class="login-mask">
    <div class="login-wrapper">
      <div class="login-container">
        <div class="main"/>
        <div class="form">
          <h3 @click="onShowRegister">创建账户</h3>
          <h3 @click="onShowLogin">登录</h3>
          <div class="register">
            <input @input="validInfo" v-model="userInfo.username" type="text" placeholder="用户名">
            <input @input="validInfo" v-model="userInfo.password" type="password" placeholder="密码">
            <p :class="{error:userInfo.isError}">{{ userInfo.notice }}</p>
            <div @click="onSubmit" class="button">{{ title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, .7);
  transition: opacity 0.3s ease;
  display: table;

  .login-wrapper {
    display: table-cell;
    vertical-align: middle;

    .login-container {
      display: flex;
      width: 70%;
      height: 80%;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      font-family: Helvetica, Arial, sans-serif;

      .main {
        flex: 2;
        background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
        background-size: contain;
      }

      .form {
        flex: 1;
        border-left: 1px solid #ccc;

        h3 {
          padding: 0.6em 1.2em;
          font-weight: normal;
          font-size: 16px;
          cursor: pointer;
          border-top: 1px solid #eee;

          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }

        .login,
        .register {
          padding: 0.6em 1.2em;
          border-top: 1px solid #eee;

          input {
            display: block;
            width: 100%;
            line-height: 2.5em;
            padding: 0 0.6em;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 0.8em;

            &:focus {
              border: 1px solid #9dcaf8;
            }
          }

          p {
            font-size: 12px;
            margin-top: 1em;
            color: #444;

            &.error {
              color: red;
            }
          }

          .button {
            background-color: #2bb964;
            line-height: 2.5em;
            text-align: center;
            color: #fff;
            border-radius: 4px;
            margin-top: 16px;
            cursor: pointer;
          }
        }

        .login {
          border-top: none;
        }
      }
    }
  }
}
</style>