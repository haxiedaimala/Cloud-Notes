<script setup lang="ts">
import {ArrowDown} from '@element-plus/icons-vue';
import {onBeforeMount, ref, watchPostEffect} from 'vue';
import Notebooks from '../api/notebooks';
import Notes from '../api/notes';
import {useRoute, useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

const notebooks = ref<NotebookItem[]>([]);
const notes = ref<NoteItem[]>([]);
const currentBook = ref<NotebookItem>();
const currentNote = ref<NoteItem>();
const route = useRoute();
const router = useRouter();
const emits = defineEmits<{
  (e: 'update:notes', value: NoteItem[]): void
}>();
onBeforeMount(() => {
  Notebooks.getAll()
      .then(result => {
        const data = (result as NotebookList).data;
        notebooks.value = data;
        if (data.length === 0) return;
        //获取最新创建的笔记本信息--直接访问笔记页面（无notebookId），点击笔记本列表进入（有notebookId）
        currentBook.value = data.find(notebook => notebook.id.toString() === route.query.notebookId) || data[0];
        return Notes.getAll({notebookId: currentBook.value!.id});
      })
      .then(result => {
        notes.value = (result as NoteList).data;
        emits('update:notes', notes.value);
      });
});
const handleCommand = (command: string | number | object) => {
  if (command === 'trash') return router.push({path: '/trash'});
  currentBook.value = notebooks.value.find(notebook => notebook.id === (command as number));
  Notes.getAll({notebookId: command as number}).then(data => {
    notes.value = (data as NoteList).data;
  });
};
const onCreateNote = () => {
  if (currentBook.value === undefined) return;
  Notes.addNote({notebookId: currentBook.value.id})
      .then(data => {
        const result = data as CreateNote;
        ElMessage.success(result.msg);
        notes.value.unshift(result.data as NoteItem);
      });
};
watchPostEffect(() => {
  if (notes.value.length === 0) return;
  currentNote.value = notes.value.find(item => item.id.toString() === route.query.noteId);
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
.note-sidebar {
  width: 290px;
  border-right: 1px solid #ccc;

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
    li {
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      &.active {
        a {
          color: #1687ea;
        }

        //border: 1px solid #ccc;
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