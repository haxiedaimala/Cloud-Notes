<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';

validLogin();
</script>

<template>
  <div class="notebooks-wrapper">
    <header>
      <a href="#">
        <i class="iconfont icon-note"/>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <h3>笔记本列表（10）</h3>
      <div class="notebook-list">
        <div class="notebook-item">
          <i class="iconfont icon-note"/>
          <span class="notebook-title">笔记本标题1</span>
          <span>10</span>
          <span class="date">5天前</span>
          <span class="action">编辑</span>
          <span class="action">删除</span>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.notebooks-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    line-height: 3em;
    border-bottom: 1px solid #ccc;

    a {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-left: 2em;
      color: #666;
      cursor: pointer;

      .iconfont {
        font-size: 16px;
        margin-right: 0.4em;
      }
    }
  }

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 2em;
    overflow-y: scroll;

    h3 {
      font-weight: 550;
    }

    .notebook-list {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin-top: 1em;
      color: #666;

      .notebook-item {
        display: flex;
        align-items: center;
        padding: 0.6em 1.2em;
        margin-top: 1em;
        font-size: 14px;
        border-radius: 6px;
        color: #b3c2c8;
        background-color: #fff;
        cursor: pointer;

        .iconfont {
          color: #1687ea;
          margin-right: 0.4em;
        }

        .notebook-title {
          flex: 1;
          font-weight: 550;
          color: #666;
        }

        .date {
          margin-left: 0.6em;
        }

        .action {
          padding: 0 0.6em;
          cursor: pointer;
        }

        &:nth-child(1) {
          margin-top: 0;
        }

        &:hover {
          background-color: #f7fafd;
        }
      }
    }
  }
}
</style>