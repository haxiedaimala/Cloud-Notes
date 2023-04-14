<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';
import NoteSidebar from '../components/NoteSidebar.vue';

validLogin();
</script>

<template>
  <div class="layout">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：2天前</span>
        <span>更新日期：1天前</span>
        <span>未更新</span>
        <span class="icon-wrapper"><i class="iconfont icon-trash"/></span>
        <span class="icon-wrapper"><i class="iconfont icon-fullscreen"/></span>
      </div>
      <div class="note-title">
        <input type="text" placeholder="输入标题"/>
      </div>
      <div class="note-editor">
        <textarea v-show="true" placeholder="输入内容，支持 markdown 语法"></textarea>
        <div class="note-preview markdown-body" v-show="false" v-html="xx"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  flex: 1;
  display: flex;

  .note-detail {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;

    .note-bar {
      padding: 0.4em 1.2em;
      border-bottom: 1px solid #eee;

      &::after {
        content: '';
        clear: both;
        display: block;
      }

      span {
        font-size: 12px;
        color: #999;

        &.icon-wrapper {
          float: right;

          .iconfont {
            font-size: 18px;
            cursor: pointer;
          }
        }
      }

      span + span {
        margin-left: 1em;
      }
    }

    .note-title {
      input {
        display: inline-block;
        width: 100%;
        font-size: 18px;
        padding: 1em 1.2em;
        border: none;
        outline: none;
      }
    }

    .note-editor {
      flex: 1;

      textarea,
      .note-preview {
        width: 100%;
        height: 100%;
        padding: 1em 1.2em;
      }

      textarea {
        font-size: 14px;
        font-family: 'Monaco', "Courier New", monospace;
        border: none;
        outline: none;
        resize: none;
      }
    }
  }
}
</style>