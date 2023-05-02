<script setup lang="ts">
import {computed, onBeforeMount, watchPostEffect} from 'vue';
import {useAuthStore} from '../store/auth';
import {useTrashStore} from '../store/trash';
import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
import {storeToRefs} from 'pinia';
import {useRoute, useRouter} from 'vue-router';
import {useNotebookStore} from '../store/notebook';
import {ElMessageBox} from 'element-plus';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const trashStore = useTrashStore();
const notebookStore = useNotebookStore();
const {currentTrashNote, trashNotes, belongTo} = storeToRefs(trashStore);
const markdown = computed(() => new MarkdownIt().render(currentTrashNote.value!.content));
onBeforeMount(() => {
  authStore.checkLogin();
  notebookStore.getNotebooks();
  trashStore.getTrashNotes()
      .then(() => {
        return trashStore.setCurrentNote({noteId: parseInt(route.query.noteId as string)});
      })
      .then(() => {
        router.replace({
          path: '/trash',
          query: {noteId: currentTrashNote.value?.id}
        });
      });
});
watchPostEffect(() => {
  trashStore.setCurrentNote({noteId: parseInt(route.query.noteId as string)});
});
const onDeleteNote = () => {
  ElMessageBox.confirm('删除后不可恢复', '确定删除吗？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        return trashStore.deleteTrashNote({noteId: (currentTrashNote.value as NoteItem).id});
      })
      .then(() => {
        return trashStore.setCurrentNote();
      })
      .then(() => {
        router.replace({
          path: '/trash',
          query: {noteId: currentTrashNote.value?.id}
        });
      })
      .catch(error => {if (error === 'cancel') return;});
};
const onRevertNote = () => {
  trashStore.revertTrashNote({noteId: (currentTrashNote.value as NoteItem).id})
      .then(() => {
        return trashStore.setCurrentNote();
      })
      .then(() => {
        router.replace({
          path: '/trash',
          query: {noteId: currentTrashNote.value?.id}
        });
      });
};
const onDeleteAll = () => {
  ElMessageBox.confirm('删除后不可恢复', '全部删除吗？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        return trashStore.deleteAllTrashNote();
      })
      .then(() => {
        return trashStore.setCurrentNote();
      })
      .then(() => {
        router.replace({
          path: '/trash',
          query: {noteId: currentTrashNote.value?.id}
        });
      })
      .catch(error => {if (error === 'cancel') return;});
};
</script>

<template>
  <div class="layout">
    <div class="trash-sidebar">
      <div class="trash-head">
        <span>回收站</span>
        <span v-if="trashNotes" class="note-deleteAll" @click="onDeleteAll">全部删除</span>
      </div>
      <div class="menu">
        <span>更新时间</span>
        <span>标题</span>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes"
            :key="note.id"
            :class="{active:currentTrashNote && note.id===currentTrashNote.id}">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="note-date">{{ note.friendlyUpdatedAt }}</span>
            <span class="note-title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="trash-detail">
      <template v-if="trashNotes.length===0">
        <div class="trash-empty">暂无回收笔记</div>
      </template>
      <template v-else-if="currentTrashNote===undefined">
        <div class="trash-empty">请选择笔记</div>
      </template>
      <template v-else>
        <div class="trash-bar">
          <span>创建日期：{{ currentTrashNote.friendlyCreateAt }}</span>
          <span>更新日期：{{ currentTrashNote.friendlyUpdatedAt }}</span>
          <span class="belongTo">所属笔记本：{{ belongTo }}</span>
          <span class="actions">
            <span @click="onRevertNote">恢复</span>
            <span @click="onDeleteNote">彻底删除</span>
          </span>
        </div>
        <div class="note-title">{{ currentTrashNote.title }}</div>
        <div class="note-editor markdown-body" v-html="markdown"/>
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

  .trash-sidebar {
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #ccc;
    overflow-y: scroll;
    @extend %scroll;

    .trash-head {
      position: relative;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8em 0;
      background-color: #f7f7f7;
      border-bottom: 1px solid #ccc;

      .note-deleteAll {
        position: absolute;
        top: 50%;
        right: 0.4em;
        z-index: 10;
        transform: translate(0, -50%);
        color: #666;
        font-size: 12px;
        padding: 0.4em;
        cursor: pointer;
      }
    }

    .menu {
      display: flex;
      align-items: center;
      font-size: 14px;
      border-bottom: 1px solid #ccc;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: 0.4em 0;
        border-right: 1px solid #ccc;

        &:last-child {
          border-right: none;
        }
      }
    }

    .notes {
      @extend %scroll;
      flex: 1;
      overflow-y: scroll;

      li {
        &:nth-child(odd) {
          background-color: #f2f2f2;
        }

        &.active {
          a {
            color: #1687ea;
          }
        }

        a {
          display: flex;
          align-items: center;
          padding: 0.6em 0;
          font-size: 12px;

          span {
            @extend %single-line-ellipsis;
            flex: 1;
            padding: 0 1em;
            text-align: center;
          }
        }
      }
    }
  }

  .trash-detail {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #fff;
    overflow-y: scroll;
    @extend %scroll;

    .trash-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
      color: #ccc;
    }

    .trash-bar {
      display: flex;
      align-items: center;
      padding: 0.6em 1.5em;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      color: #999;

      .belongTo {
        @extend %single-line-ellipsis;
        flex: 1;
      }

      .actions {
        margin-left: auto;
        margin-right: 2em;

        span {
          cursor: pointer;
        }
      }

      span + span {
        margin-left: 1.5em;
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
      overflow-y: scroll;
      line-height: 1.5;
      padding: 1em 2em 2em;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
</style>