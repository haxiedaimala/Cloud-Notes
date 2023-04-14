import request from '../helpers/request';
import friendlyDate from '../helpers/friendlyDate';

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId',
};
export default {
  getAll({notebookId}: { notebookId: number }) {
    return new Promise((resolve, reject) => {
      request(URL.GET.replace(':notebookId', notebookId.toString()), 'GET')
        .then(data => {
          const result = data as NoteList;
          result.data = result.data.sort((a: NoteItem, b: NoteItem) => a.updatedAt < b.updatedAt ? 1 : -1);
          result.data.forEach(item => {
            item.friendlyUpdatedAt = friendlyDate(item.updatedAt);
            item.friendlyCreateAt = friendlyDate(item.createdAt);
          });
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addNote({notebookId}: { notebookId: number }, {title = '', content = ''} = {title: '', content: ''}) {
    return request(URL.ADD.replace(':notebookId', notebookId.toString()), 'POST', {title, content});
  },
  updateNote({noteId}: { noteId: number }, {title, content}: { title?: string, content?: string }) {
    return request(URL.UPDATE.replace(':noteId', noteId.toString()), 'PATCH', {title, content});
  },
  deleteNote({noteId}: { noteId: number }) {
    return request(URL.DELETE.replace(':noteId', noteId.toString()), 'DELETE');
  }
};