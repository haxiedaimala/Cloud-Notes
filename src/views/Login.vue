<script setup lang="ts">
import {ref} from 'vue';

const isShow = ref(true);
const register = ref({
  username: '',
  password: '',
  isError: false,
  notice: '输入用户名和密码'
});
const login = ref({
  username: '',
  password: '',
  isError: false,
  notice: '创建账户后，请记住用户名和密码'
});
const onShowRegister = () => isShow.value = true;
const onShowLogin = () => isShow.value = false;
const validUsername = (username: string) => {
  return {
    isValid: /^[a-zA-Z_\d\u4E00-\u9FA5]{3,15}$/.test(username),
    notice: '用户名必须是3~15个字符，限数字字母下划线中文'
  };
};
const validPassword = (password: string) => {
  return {
    isValid: /^.{6,16}$/.test(password),
    notice: '密码长度为6~16个字符'
  };
};
const onRegister = () => {
  //验证用户名
  const result1 = validUsername(register.value.username);
  if (!result1.isValid) {
    register.value.isError = true;
    register.value.notice = result1.notice;
    return;
  }
  //验证密码
  const result2 = validPassword(register.value.password);
  if (!result2.isValid) {
    register.value.isError = true;
    register.value.notice = result2.notice;
    return;
  }
  register.value.isError = false;
  register.value.notice = '';
  //TODO 提交注册信息
  console.log('start register...,username:', register.value.username, 'password:', register.value.password);
};
const onLogin = () => {
  //验证用户名
  const result1 = validUsername(login.value.username);
  if (!result1.isValid) {
    login.value.isError = true;
    login.value.notice = result1.notice;
    return;
  }
  //验证密码
  const result2 = validPassword(login.value.password);
  if (!result2.isValid) {
    login.value.isError = true;
    login.value.notice = result2.notice;
    return;
  }
  login.value.isError = false;
  login.value.notice = '';
  //TODO 提交注册信息
  console.log('start login...,username:', login.value.username, 'password:', login.value.password);
};
</script>

<template>
  <div class="login-mask">
    <div class="login-wrapper">
      <div class="login-container">
        <div class="main"/>
        <div class="form">
          <h3 @click="onShowRegister">创建账户</h3>
          <div v-show="isShow" class="register">
            <input v-model="register.username" type="text" placeholder="用户名">
            <input v-model="register.password" type="password" placeholder="密码">
            <p :class="{error:register.isError}">{{ register.notice }}</p>
            <div @click="onRegister" class="button">创建账号</div>
          </div>
          <h3 @click="onShowLogin">登录</h3>
          <div v-show="!isShow" class="login">
            <input v-model="login.username" type="text" placeholder="用户名">
            <input v-model="login.password" type="password" placeholder="密码">
            <p :class="{error:login.isError}">{{ login.notice }}</p>
            <div @click="onLogin" class="button">登录</div>
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