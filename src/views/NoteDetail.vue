<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';
import NoteSidebar from '../components/NoteSidebar.vue';
import {ref} from 'vue';
import {onBeforeRouteUpdate} from 'vue-router';

validLogin();
const currentNote = ref<NoteItem>();
const notes = ref<NoteItem[]>([]);
const onUpdateNotes = (value: NoteItem[]) => notes.value = value;
onBeforeRouteUpdate(to => {
  currentNote.value = notes.value.find(note => note.id.toString() === to.query.noteId);
});
</script>

<template>
  <div class="layout">
    <NoteSidebar @update:notes="onUpdateNotes"/>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{ currentNote && currentNote.friendlyCreateAt }}</span>
        <span>更新日期：{{ currentNote && currentNote.friendlyUpdatedAt }}</span>
        <span>{{ currentNote && currentNote.statusText }}</span>
        <span class="icon-wrapper"><i class="iconfont icon-trash"/></span>
        <span class="icon-wrapper"><i class="iconfont icon-fullscreen"/></span>
      </div>
      <div class="note-title">
        <input type="text" :value="currentNote && currentNote.title" placeholder="输入标题"/>
      </div>
      <div class="note-editor">
        <textarea v-show="true" :value="currentNote && currentNote.content"
                  placeholder="输入内容，支持 markdown 语法"></textarea>
        <div class="note-preview markdown-body" v-show="false"></div>
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