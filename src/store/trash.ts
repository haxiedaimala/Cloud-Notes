import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Trash from '../api/trash';
import {ElMessage} from 'element-plus';
import {useNotebookStore} from './notebook';

export const useTrashStore = defineStore('trash', () => {
  const notebookStore = useNotebookStore();
  //states
  const trashNoteList = ref<NoteItem[]>([]);
  const currentTrashNoteId = ref<number | null>(null);
  //getters/
  const trashNotes = computed(() => trashNoteList.value);
  const currentTrashNote = computed<NoteItem | undefined>(() => {
    if (trashNotes.value.length === 0) return;
    if (!currentTrashNoteId.value) return trashNotes.value[0];
    return trashNotes.value.find(note => note.id === currentTrashNoteId.value);
  });
  const belongTo = computed(() => {
    const notebook = notebookStore.notebooks.find(notebook => notebook.id === currentTrashNote.value!.notebookId);
    return notebook === undefined ? '' : notebook.title;
  });

  // actions
  function setCurrentNote({noteId}: { [noteId: string]: number } = {}) {
    currentTrashNoteId.value = noteId;
  }

  function getTrashNotes() {
    return Trash.getAll()
      .then(data => {
        trashNoteList.value = (data as TrashNoteList).data;
      });
  }

  function deleteTrashNote({noteId}: { noteId: number }) {
    return Trash.deleteNote({noteId})
      .then(data => {
        const findNote = trashNotes.value.find(item => item.id === noteId)!;
        trashNoteList.value = trashNoteList.value.filter(note => note.id !== noteId);
        notebookStore.notebooks.find(item => item.id === findNote.notebookId)!.noteCounts -= 1;
        ElMessage.success((data as DeleteTrashNote).msg);
      });
  }

  function deleteAllTrashNote() {
    let arr: Promise<unknown>[] = [];
    for (const trashNote of trashNotes.value) {
      arr.push(Trash.deleteNote({noteId: trashNote.id}));
    }
    return Promise.all(arr)
      .then(data => {
        for (const trashNote of trashNotes.value) {
          notebookStore.notebooks.find(item => item.id === trashNote.notebookId)!.noteCounts -= 1;
        }
        trashNoteList.value = [];
        ElMessage.success((data as DeleteTrashNote[])[0].msg);
      });
  }

  function revertTrashNote({noteId}: { noteId: number }) {
    return Trash.revertNote({noteId})
      .then(data => {
        trashNoteList.value = trashNoteList.value.filter(note => note.id !== noteId);
        ElMessage.success((data as RevertTrashNote).msg);
      });
  }

  return {
    trashNotes,
    currentTrashNote,
    belongTo,
    setCurrentNote,
    getTrashNotes,
    deleteTrashNote,
    revertTrashNote,
    deleteAllTrashNote,
  };
});