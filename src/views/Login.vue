<script setup lang="ts">
</script>

<template>
  <div class="login-mask">
    <div class="login-wrapper">
      <div class="login-container">
        <div class="main"/>
        <div class="form">
          <h3>创建账户</h3>
          <div v-show="false" class="register">
            <input type="text" placeholder="用户名">
            <input type="password" placeholder="密码">
            <div class="button">创建账号</div>
          </div>
          <h3>登录</h3>
          <div v-show="true" class="login">
            <input type="text" placeholder="用户名">
            <input type="password" placeholder="密码">
            <div class="button">登录</div>
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