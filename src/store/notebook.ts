import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Notebooks from '../api/notebooks';
import {ElMessage} from 'element-plus';

export const useNotebookStore = defineStore('notebook', () => {
  //state
  const notebookList = ref<NotebookItem[]>([]);
  //getters
  const notebooks = computed(() => notebookList.value);

  //actions
  function getNotebooks() {
    Notebooks.getAll()
      .then(result => {
        notebookList.value = (result as NotebookList).data;
      });
  }

  function addNotebook({title}: { title: string }) {
    Notebooks.addNotebook({title: title})
      .then(data => {
        notebookList.value.unshift((data as CreateNotebook).data!);
        ElMessage.success((data as CreateNotebook).msg);
      });
  }

  function updateNotebook({notebookId, title}: { notebookId: number, title: string }) {
    Notebooks.updateNotebook(notebookId, {title})
      .then((data) => {
        const findNotebook = notebookList.value.find(item => item.id === notebookId);
        if (findNotebook === undefined) return;
        findNotebook.title = title;
        ElMessage.success((data as UpdateNotebook).msg);
      });
  }

  function deleteNotebook({notebookId}: { notebookId: number }) {
    Notebooks.deleteNotebook(notebookId)
      .then((data) => {
        notebookList.value = notebookList.value.filter(item => item.id !== notebookId);
        ElMessage.success((data as DeleteNotebook).msg);
      });
  }

  return {
    notebooks,
    getNotebooks,
    addNotebook,
    updateNotebook,
    deleteNotebook
  };
});