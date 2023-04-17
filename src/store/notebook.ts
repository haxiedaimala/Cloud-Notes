import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Notebooks from '../api/notebooks';
import {ElMessage} from 'element-plus';

export const useNotebookStore = defineStore('notebook', () => {
  //state
  const notebookList = ref<NotebookItem[]>([]);
  const currentBookId = ref<number | null>(null);
  //getters
  const notebooks = computed(() => notebookList.value);
  const currentBook = computed(() => {
    if (notebooks.value.length === 0) return;
    if (currentBookId.value === null) return notebooks.value[0];
    return notebooks.value.find(notebook => notebook.id === currentBookId.value);
  });

  //actions
  function getNotebooks() {
    return Notebooks.getAll()
      .then(result => {
        notebookList.value = (result as NotebookList).data;
      });
  }

  function addNotebook({title}: { title: string }) {
    return Notebooks.addNotebook({title: title})
      .then(data => {
        notebookList.value.unshift((data as CreateNotebook).data!);
        ElMessage.success((data as CreateNotebook).msg);
      });
  }

  function updateNotebook({notebookId, title}: { notebookId: number, title: string }) {
    return Notebooks.updateNotebook(notebookId, {title})
      .then((data) => {
        const findNotebook = notebookList.value.find(item => item.id === notebookId);
        if (findNotebook === undefined) return;
        findNotebook.title = title;
        ElMessage.success((data as UpdateNotebook).msg);
      });
  }

  function deleteNotebook({notebookId}: { notebookId: number }) {
    return Notebooks.deleteNotebook(notebookId)
      .then((data) => {
        notebookList.value = notebookList.value.filter(item => item.id !== notebookId);
        ElMessage.success((data as DeleteNotebook).msg);
      });
  }

  function setCurrentBookId({notebookId}: { notebookId: number }) {
    if (isNaN(notebookId)) return;
    currentBookId.value = notebookId;
  }

  return {
    notebooks,
    currentBook,
    getNotebooks,
    addNotebook,
    updateNotebook,
    deleteNotebook,
    setCurrentBookId,
  };
});