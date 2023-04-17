import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Notes from '../api/notes';
import {ElMessage} from 'element-plus';

export const useNoteStore = defineStore('note', () => {
  //states
  const noteList = ref<NoteItem[]>([]);
  const currentNoteId = ref<number | null>(null);
  //getters
  const notes = computed(() => noteList.value);
  const currentNote = computed(() => {
    if (noteList.value.length === 0) return;
    if (currentNoteId.value === null) return;
    return notes.value.find(note => note.id === currentNoteId.value);
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
        noteList.value.unshift(result.data!);
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

  function setCurrentNoteId({noteId}: { noteId: number }) {
    if (isNaN(noteId)) return;
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
