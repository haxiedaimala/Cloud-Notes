<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue';
import {useAuthStore} from '../store/auth';
import MarkdownIt from 'markdown-it';

const authStore = useAuthStore();
const currentTrashNote = ref({
  id: 2,
  title: 'hhh',
  content: '# title',
  friendlyCreateAt: '3天前',
  friendlyUpdatedAt: '刚刚',
});
const belongTo = ref('我的笔记本');
const trashNotes = ref([
  {
    id: 2,
    title: 'hhh',
    content: '# title',
    friendlyCreateAt: '3天前',
    friendlyUpdatedAt: '刚刚',
  },
  {
    id: 3,
    title: 'sss',
    content: '# 5896',
    friendlyCreateAt: '25天前',
    friendlyUpdatedAt: '3分钟前',
  }
]);
const markdown = computed(() => new MarkdownIt().render(currentTrashNote.value.content));
onBeforeMount(() => {
  authStore.checkLogin();
});
const onDeleteNote = () => {console.log('delete');};
const onRevertNote = () => {console.log('revert');};
</script>

<template>
  <div class="layout">
    <div class="trash-sidebar">
      <div class="trash-head">回收站</div>
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
      <template v-if="!currentTrashNote.id">
        <div class="trash-empty">请选择笔记</div>
      </template>
      <template v-else>
        <div class="trash-bar">
          <span>创建日期：{{ currentTrashNote.friendlyCreateAt }}</span>
          <span>更新日期：{{ currentTrashNote.friendlyUpdatedAt }}</span>
          <span>所属笔记本：{{ belongTo }}</span>
          <span class="actions" @click="onRevertNote">恢复</span>
          <span class="actions" @click="onDeleteNote">彻底删除</span>
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

  .trash-sidebar {
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #ccc;
    overflow-y: scroll;
    @extend %scroll;

    .trash-head {
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.8em 0;
      background-color: #f7f7f7;
      border-bottom: 1px solid #ccc;
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
          padding: 0.6em 0;
          font-size: 12px;

          span {
            display: flex;
            justify-content: center;
            flex: 1;
            padding: 0 1em;
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
      padding: 0 1.5em;
      line-height: 3em;
      border-bottom: 1px solid #eee;
      font-size: 12px;
      color: #999;

      &::after {
        content: '';
        clear: both;
        display: block;
      }

      .actions {
        float: right;
        cursor: pointer;
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
      @extend %scroll;
      flex: 1;
      display: flex;
      overflow-y: scroll;
      line-height: 1.5;
      padding: 1em 2em 2em;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
}
</style>