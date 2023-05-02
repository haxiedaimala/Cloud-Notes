<script setup lang="ts">
import NoteSidebar from '../components/NoteSidebar.vue';
import {computed, onBeforeMount, ref} from 'vue';
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router';
import antiShake from '../helpers/antiShake';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
import {useNoteStore} from '../store/note';
import {useAuthStore} from '../store/auth';
import {useNotebookStore} from '../store/notebook';

const noteStore = useNoteStore();
const authStore = useAuthStore();
const notebookStore = useNotebookStore();
const currentNote = computed(() => noteStore.currentNote);
const currentBook = computed(() => notebookStore.currentBook);
const route = useRoute();
const router = useRouter();
const statusText = ref('未改动');
const isPreview = ref(false);
const markdown = computed(() => new MarkdownIt().render(currentNote.value.content));
onBeforeMount(() => {
  authStore.checkLogin();
  noteStore.setCurrentNoteId({noteId: parseInt(route.query.noteId as string)});
});
onBeforeRouteUpdate(to => {
  statusText.value = '未改动';
  isPreview.value = false;
  noteStore.setCurrentNoteId({noteId: parseInt(to.query.noteId as string)});
});
const onInput = () => antiShake(function () {
  if (!currentNote.value.hasOwnProperty('id')) return;
  noteStore.updateNote({
    noteId: (currentNote.value as NoteItem).id,
    title: currentNote.value.title,
    content: currentNote.value.content
  }).then(() => {
    statusText.value = '已保存';
  }).catch(() => {
    statusText.value = '保存出错';
  });
});
const onKeyDown = () => statusText.value = '编辑中...';
const onDeleteNote = () => {
  noteStore.deleteNote({noteId: (currentNote.value as NoteItem).id})
      .then(() => {
        router.replace({path: '/note'});
      });
};
const onTogglePreview = () => isPreview.value = !isPreview.value;
</script>

<template>
  <div class="layout">
    <NoteSidebar/>
    <div class="note-detail">
      <div class="note-empty" v-if="!currentBook">请先创建笔记本</div>
      <div class="note-empty" v-else-if="!currentNote.hasOwnProperty('id')">选择或创建笔记</div>
      <template v-if="currentNote.hasOwnProperty('id')">
        <div class="note-bar">
          <span>创建日期：{{ currentNote.friendlyCreateAt }}</span>
          <span>更新日期：{{ currentNote.friendlyUpdatedAt }}</span>
          <span>{{ statusText }}</span>
          <span class="actions">
            <span class="icon-wrapper" @click="onTogglePreview">
              <i class="iconfont" :class="{'icon-eye':!isPreview,'icon-edit':isPreview}"/>
            </span>
             <span class="icon-wrapper" @click="onDeleteNote">
              <i class="iconfont icon-trash"/>
            </span>
         </span>
        </div>
        <input type="text"
               class="note-title"
               :disabled="isPreview"
               v-model="currentNote.title"
               @input="onInput"
               @keydown="onKeyDown"
               placeholder="输入标题"/>
        <div class="note-editor">
          <textarea v-show="!isPreview"
                    v-model="currentNote.content"
                    @input="onInput"
                    @keydown="onKeyDown"
                    placeholder="输入内容，支持 markdown 语法"/>
          <div class="note-preview markdown-body" v-html="markdown" v-show="isPreview"/>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/helper";

.layout {
  flex: 1;
  display: flex;
  overflow-y: auto;

  .note-detail {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;
    @extend %scroll;

    .note-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      color: #ccc;
    }

    .note-bar {
      display: flex;
      align-items: center;
      padding: 0.6em 1.5em;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      color: #999;

      span {
        @extend %single-line-ellipsis;

        &.actions {
          margin-left: auto;
          margin-right: 2em;

          .icon-wrapper {
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
      overflow-y: scroll;
      @extend %scroll;

      textarea,
      .note-preview {
        flex: 1;
        line-height: 1.5;
        padding: 1em 2em 2em;
        word-break: break-all;
        word-wrap: break-word;
      }

      .note-preview {
        overflow-y: scroll;
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