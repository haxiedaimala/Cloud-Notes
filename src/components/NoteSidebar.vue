<script setup lang="ts">
import {ArrowDown} from '@element-plus/icons-vue';
import {ref} from 'vue';

const handleCommand = (command: string | number | object) => {
  console.log(command);
};
const notebooks = ref([
  {id: 1, title: 'title-01'},
  {id: 2, title: 'title-02'},
  {id: 3, title: 'title-03'},
]);
const notes = ref([
  {id: 11, title: '第一个笔记', updateAtFriendly: '刚刚'},
  {id: 12, title: '第二个笔记', updateAtFriendly: '1小时前'},
  {id: 13, title: '第三个笔记', updateAtFriendly: '2月前'},
]);
</script>

<template>
  <div class="note-sidebar">
    <div class="note-head">
      <span class="note-add">添加笔记</span>
      <el-dropdown class="notebook-title" @command="handleCommand">
        <span class="el-dropdown-link">
          我的笔记本1<el-icon class="el-icon--right"><arrow-down/></el-icon>
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
      <span>标题</span>
      <span>更新时间</span>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="note-date">{{ note.updateAtFriendly }}</span>
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
      right: 0;
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