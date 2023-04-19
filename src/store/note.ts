import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Notes from '../api/notes';
import {ElMessage} from 'element-plus';
import {useNotebookStore} from './notebook';

export const useNoteStore = defineStore('note', () => {
  //states
  const noteList = ref<NoteItem[]>([]);
  const currentNoteId = ref<number | null>(null);
  //getters
  const notes = computed(() => noteList.value);
  const currentNote = computed<NoteItem | MockCurrentNote>(() => {
    if (noteList.value.length === 0) return {title: '', content: ''};
    if (!currentNoteId.value) return notes.value[0] || {title: '', content: ''};
    return notes.value.find(note => note.id === currentNoteId.value) || {title: '', content: ''};
  });

  //actions
  function getNotes({notebookId}: { notebookId: number }) {
    return Notes.getAll({notebookId})
      .then(data => {
        noteList.value = (data as NoteList).data;
      });
  }

  function addNote({notebookId}: { notebookId: number }) {
    return Notes.addNote({notebookId})
      .then(data => {
        const result = data as CreateNote;
        const notebookStore = useNotebookStore();
        noteList.value.unshift(result.data!);
        notebookStore.notebooks.find(notebook => notebook.id === notebookId)!.noteCounts += 1;
        ElMessage.success((result.msg));
      });
  }

  function updateNote({noteId, title, content}: { noteId: number, title: string, content: string }) {
    return Notes.updateNote({noteId}, {title, content})
      .then(() => {
        let findNote = noteList.value.find(note => note.id === noteId);
        if (findNote === undefined) return;
        findNote.title = title;
        findNote.content = content;
      });
  }

  function deleteNote({noteId}: { noteId: number }) {
    return Notes.deleteNote({noteId})
      .then(data => {
        noteList.value.splice(noteList.value.indexOf(currentNote.value as NoteItem), 1);
        ElMessage.success((data as DeleteNote).msg);
      });
  }

  function setCurrentNoteId({noteId}: { [noteId: string]: number } = {}) {
    currentNoteId.value = noteId;
  }

  return {
    notes,
    currentNote,
    getNotes,
    addNote,
    updateNote,
    deleteNote,
    setCurrentNoteId,
  };
});
