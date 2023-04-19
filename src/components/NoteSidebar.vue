<script setup lang="ts">
import {ArrowDown} from '@element-plus/icons-vue';
import {onBeforeMount, watchPostEffect} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useNotebookStore} from '../store/notebook';
import {useNoteStore} from '../store/note';
import {storeToRefs} from 'pinia';

const notebookStore = useNotebookStore();
const noteStore = useNoteStore();
const {notebooks, currentBook} = storeToRefs(notebookStore);
const {notes, currentNote} = storeToRefs(noteStore);
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  notebookStore.getNotebooks()
      .then(() => {
        notebookStore.setCurrentBookId({notebookId: parseInt(route.query.notebookId as string)});
        return noteStore.getNotes({notebookId: currentBook.value!.id});
      })
      .then(() => {
        return noteStore.setCurrentNoteId({noteId: parseInt(route.query.noteId as string)});
      })
      .then(() => {
        router.replace({
          path: '/note',
          query: {
            noteId: currentNote.value?.id,
            notebookId: currentBook.value?.id
          }
        });
      });
});
const handleCommand = (command: string | number | object) => {
  if (command === 'trash') return router.push({path: '/trash'});
  notebookStore.setCurrentBookId({notebookId: command as number});
  noteStore.getNotes({notebookId: command as number})
      .then(() => {
        noteStore.setCurrentNoteId();
        router.replace({
          path: '/note',
          query: {
            noteId: currentNote.value?.id,
            notebookId: currentBook.value?.id
          }
        });
      });
};
const onCreateNote = () => {
  if (currentBook.value === undefined) return;
  noteStore.addNote({notebookId: currentBook.value.id});
};
watchPostEffect(() => {
  noteStore.setCurrentNoteId({noteId: parseInt(route.query.noteId as string)});
});
</script>

<template>
  <div class="note-sidebar">
    <div class="note-head">
      <span class="note-add" @click="onCreateNote">添加笔记</span>
      <el-dropdown class="notebook-title" @command="handleCommand" max-height="80vh">
        <span class="el-dropdown-link">
         {{ currentBook && currentBook.title }}<el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="notebook in notebooks"
                              :key="notebook.id"
                              :command="notebook.id">
              {{ notebook.title }}
            </el-dropdown-item>
            <el-dropdown-item command="trash" divided>回收站</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="menu">
      <span>更新时间</span>
      <span>标题</span>
    </div>
    <ul class="notes">
      <li v-for="note in notes"
          :key="note.id"
          :class="{active:currentNote && note.id===currentNote.id}">
        <router-link :to="`/note?noteId=${note.id}&&notebookId=${currentBook&&currentBook.id}`">
          <span class="note-date">{{ note.friendlyUpdatedAt }}</span>
          <span class="note-title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/helper";

.note-sidebar {
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 1px solid #ccc;
  overflow-y: scroll;
  @extend %scroll;

  .note-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em 0;
    background-color: #f7f7f7;
    border-bottom: 1px solid #ccc;

    .note-add {
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

    .notebook-title {
      font-size: 16px;
      color: #333;

      .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
        outline: none;
      }
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
    flex: 1;
    overflow-y: scroll;
    @extend %scroll;

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
</style>