<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';
import NoteSidebar from '../components/NoteSidebar.vue';
import {ref} from 'vue';
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import Notes from '../api/notes';
import antiShake from '../helpers/antiShake';
import {ElMessage} from 'element-plus';

type CurrentNote = {
  title: '',
  content: '',
  friendlyCreateAt?: string,
  friendlyUpdatedAt?: string,
}
validLogin();
const currentNote = ref<NoteItem | CurrentNote>({title: '', content: ''});
const notes = ref<NoteItem[]>([]);
const route = useRoute();
const router = useRouter();
const statusText = ref('未改动');
const onUpdateNotes = (value: NoteItem[]) => {
  notes.value = value;
  currentNote.value = notes.value.find(note => note.id.toString() === route.query.noteId) || {title: '', content: ''};
};
onBeforeRouteUpdate(to => {
  statusText.value = '未改动';
  currentNote.value = notes.value.find(note => note.id.toString() === to.query.noteId) || {title: '', content: ''};
});
const onInput = () => antiShake(function () {
  if (!currentNote.value.hasOwnProperty('id')) return;
  Notes.updateNote(
      {noteId: (currentNote.value as NoteItem).id},
      {title: currentNote.value.title, content: currentNote.value.content})
      .then(() => {
        statusText.value = '已保存';
      })
      .catch(() => {
        statusText.value = '保存出错';
      });
});
const onKeyDown = () => statusText.value = '编辑中...';
const onDeleteNote = () => {
  Notes.deleteNote({noteId: (currentNote.value as NoteItem).id})
      .then(data => {
        ElMessage.success((data as DeleteNote).msg);
        notes.value.splice(notes.value.indexOf(currentNote.value as NoteItem), 1);
        router.replace({path: '/note'});
      });
};
</script>

<template>
  <div class="layout">
    <NoteSidebar @update:notes="onUpdateNotes"/>
    <div class="note-detail">
      <template v-if="!currentNote.id">
        <div class="note-empty">请选择笔记</div>
      </template>
      <template v-else>
        <div class="note-bar">
          <span>创建日期：{{ currentNote.friendlyCreateAt }}</span>
          <span>更新日期：{{ currentNote.friendlyUpdatedAt }}</span>
          <span>{{ statusText }}</span>
          <span class="icon-wrapper" @click="onDeleteNote"><i class="iconfont icon-trash"/></span>
          <span class="icon-wrapper"><i class="iconfont icon-fullscreen"/></span>
        </div>
        <input type="text"
               class="note-title"
               v-model="currentNote.title"
               @input="onInput"
               @keydown="onKeyDown"
               placeholder="输入标题"/>
        <div class="note-editor">
          <textarea v-show="true"
                    v-model="currentNote.content"
                    @input="onInput"
                    @keydown="onKeyDown"
                    placeholder="输入内容，支持 markdown 语法"/>
          <div class="note-preview markdown-body" v-show="false"/>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  flex: 1;
  display: flex;

  .note-detail {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;

    .note-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      color: #ccc;
    }

    .note-bar {
      padding: 0.4em 1.5em;
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
      display: inline-block;
      font-size: 18px;
      padding: 1em 1.5em;
      border: none;
      outline: none;
    }

    .note-editor {
      flex: 1;
      display: flex;

      textarea,
      .note-preview {
        flex: 1;
        line-height: 1.5;
        padding: 1em 2em 2em;
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