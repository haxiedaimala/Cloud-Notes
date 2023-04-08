<script setup lang="ts">
import {validLogin} from '../helpers/validLogin';
import Notebooks from '../api/notebooks';
import friendlyDate from '../helpers/friendlyDate';
import {ref} from 'vue';

validLogin();
let notebooks = ref<NotebookItem[]>([]);
Notebooks.getAll().then(result => {
  notebooks.value = (result as NotebookList).data;
});
const onCreate = () => {
  const title = window.prompt('请输入笔记本标题：');
  if (title == null) return;
  Notebooks.addNotebook({title})
      .then(data => {
        const result = data as CreateNotebook;
        notebooks.value.unshift({
          ...result.data!,
          noteCounts: 0,
          friendlyCreatedAt: friendlyDate(result.data!.createdAt)
        });
        alert(result.msg);
      })
      .catch(error => {
        alert(error.msg);
      });
};
const onEdit = (notebook: NotebookItem) => {
  const title = window.prompt('修改标题：', notebook.title);
  if (title == null) return;
  Notebooks.updateNotebook(notebook.id, {title}).then(data => {
    notebook.title = title;
    alert((data as UpdateNotebook).msg);
  }).catch(error => {
    alert(error.msg);
  });
};
const onDelete = (notebook: NotebookItem) => {
  const isConfirm = window.confirm('你确定要删除吗？');
  if (!isConfirm) return;
  Notebooks.deleteNotebook(notebook.id)
      .then(data => {
        notebooks.value.splice(notebooks.value.indexOf(notebook), 1);
        alert((data as DeleteNotebook).msg);
      })
      .catch(error => {
        alert(error.msg);
      });
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
        <router-link :to="`/note/${notebook.id}`"
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