import request from '../helpers/request';
import friendlyDate from '../helpers/friendlyDate';

const URL = {
  GET: '/notes/trash',
  DELETE: '/notes/:noteId/confirm',
  REVERT: '/notes/:noteId/revert'
};
export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET, 'GET')
        .then(data => {
          const result = data as TrashNoteList;
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
  deleteNote({noteId}: { noteId: number }) {
    return request(URL.DELETE.replace(':noteId', noteId.toString()), 'DELETE');
  },
  revertNote({noteId}: { noteId: number }) {
    return request(URL.REVERT.replace(':noteId', noteId.toString()), 'PATCH');
  }
};