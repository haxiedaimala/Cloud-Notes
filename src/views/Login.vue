<script setup lang="ts">
import {computed, ref, watchPostEffect} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '../store/auth';

const authStore = useAuthStore();
const router = useRouter();
const isLogin = ref(true);
const userInfo = ref({
  username: '',
  password: '',
  isError: false,
  notice: isLogin.value ? '输入用户名和密码' : '创建账户后，请记住用户名和密码'
});
const promptInfo = computed(() => {
  return {
    title: isLogin.value ? '没有账号？' : '已有账号？',
    detail: isLogin.value ? '点击注册，去注册一个属于你的账号吧' : '快快点我去进行登录吧',
    button: isLogin.value ? '注册' : '登录'
  };
});
const formInfo = computed(() => {
  return {
    title: isLogin.value ? '登录' : '注册',
    buttonTitle: isLogin.value ? '登录' : '创建账户'
  };
});
watchPostEffect(() => {
  userInfo.value.notice = isLogin.value ? '输入用户名和密码' : '创建账户后，请记住用户名和密码';
});
const onToggleLogin = () => isLogin.value = !isLogin.value;
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
  const type = isLogin.value ? 'login' : 'register';
  authStore[type]({
    username: userInfo.value.username,
    password: userInfo.value.password
  })
      .then(() => {
        userInfo.value.isError = false;
        userInfo.value.notice = '';
        router.push({path: '/notebooks'});
      })
      .catch(error => {
        userInfo.value.isError = true;
        userInfo.value.notice = error.msg;
      });
};
</script>

<template>
  <div class="login-mask">
    <div class="login-wrapper">
      <div class="login-container" :class="{active:!isLogin}">
        <div class="main">
          <h3>{{ promptInfo.title }}</h3>
          <p>{{ promptInfo.detail }}</p>
          <div @click="onToggleLogin" class="button">{{ promptInfo.button }}</div>
        </div>
        <div class="form">
          <h3>{{ formInfo.title }}</h3>
          <div class="form-info">
            <input @input="validInfo" v-model="userInfo.username" type="text" placeholder="用户名">
            <input @input="validInfo" v-model="userInfo.password" type="password" placeholder="密码">
            <p :class="{error:userInfo.isError}">{{ userInfo.notice }}</p>
            <div @click="onSubmit" class="button">{{ formInfo.buttonTitle }}</div>
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
      width: 60%;
      height: 80%;
      margin: 0 auto;
      background-color: #36bc64;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      font-family: Helvetica, Arial, sans-serif;

      .main {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        transition: all 250ms ease-in-out;

        h3 {
          font-weight: normal;
          margin-bottom: 1em;
        }

        p {
          font-size: 12px;
          padding: 1.2em;
          font-weight: 300;
          margin-bottom: 0.8em;
        }

        .button {
          border: 1px solid #fff;
          border-radius: 4px;
          cursor: pointer;
          padding: 0.3em 1.5em;

          &:hover {
            background-color: #fff;
            color: #36bc64;
          }
        }
      }

      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        transition: all 250ms ease-in-out;
        background-color: #fff;

        h3 {
          padding: 0.6em 1.2em;
          font-weight: normal;
          text-align: center;
          letter-spacing: 1em;
        }

        .form-info {
          padding: 0.6em 1.2em;

          input {
            display: block;
            width: 100%;
            line-height: 2.5em;
            padding: 0 0.6em;
            border-radius: 4px;
            border: 1px solid transparent;
            border-bottom-color: #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 0.8em;

            &:focus {
              border-bottom-color: #9dcaf8;
              transform: scale(1.01, 1.01);
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

            &:hover {
              background-color: lighten(#2bb964, 10%);
            }
          }
        }
      }

      &.active {
        .main {
          transform: translate(100%, 0);
        }

        .form {
          transform: translate(-100%, 0);
        }
      }
    }
  }
}
</style>