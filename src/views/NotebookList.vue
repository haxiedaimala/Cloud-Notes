<script setup lang="ts">
import {computed, onBeforeMount} from 'vue';
import {ElMessageBox} from 'element-plus';
import {useNotebookStore} from '../store/notebook';
import {useAuthStore} from '../store/auth';

const notebookStore = useNotebookStore();
const authStore = useAuthStore();
const notebooks = computed(() => notebookStore.notebooks);
onBeforeMount(() => {
  authStore.checkLogin();
  notebookStore.getNotebooks();
});
const onCreate = () => {
  ElMessageBox.prompt('请输入笔记本标题', '创建笔记本', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: '标题不为空，且不超过30个字符',
  })
      .then(({value}) => {
        notebookStore.addNotebook({title: value});
      })
      .catch(error => { if (error === 'cancel') return; });
};
const onEdit = (notebook: NotebookItem) => {
  ElMessageBox.prompt('请输入新笔记本标题', '修改笔记本', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^.{1,30}$/,
    inputErrorMessage: '标题不为空，且不超过30个字符',
    inputValue: notebook.title
  })
      .then(({value}) => {
        notebookStore.updateNotebook({notebookId: notebook.id, title: value});
      })
      .catch(error => {if (error === 'cancel') return;});
};
const onDelete = (notebook: NotebookItem) => {
  ElMessageBox.confirm('你确定要删除吗？', '删除笔记本', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
      .then(() => {
        notebookStore.deleteNotebook({notebookId: notebook.id});
      })
      .catch(error => {if (error === 'cancel') return;});
};
</script>

<template>
  <div class="notebooks-wrapper">
    <header>
      <div @click="onCreate" class="create">
        <i class="iconfont icon-note"/>
        <span>新建笔记本</span>
      </div>
    </header>
    <main>
      <h3>笔记本列表（{{ notebooks.length }}）</h3>
      <div class="notebook-list">
        <router-link :to="`/note?notebookId=${notebook.id}`"
                     v-for="notebook in notebooks"
                     :key="notebook.id"
                     class="notebook-item">
          <i class="iconfont icon-note"/>
          <span class="notebook-title">{{ notebook.title }}</span>
          <span>{{ notebook.noteCounts }}篇</span>
          <span class="date">{{ notebook.friendlyCreatedAt }}</span>
          <span class="action" @click.prevent="onEdit(notebook)">编辑</span>
          <span class="action" @click.prevent="onDelete(notebook)">删除</span>
        </router-link>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/helper";

.notebooks-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    line-height: 3em;
    border-bottom: 1px solid #ccc;

    .create {
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
          @extend %single-line-ellipsis;
          flex: 1;
          font-weight: 550;
          color: #666;
        }

        .date {
          margin-left: 1em;
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