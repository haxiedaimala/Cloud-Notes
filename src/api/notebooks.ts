import request from '../helpers/request';
import friendlyDate from '../helpers/friendlyDate';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:notebookId',
  DELETE: '/notebooks/:notebookId'
};
export default {
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET, 'GET')
        .then(data => {
          const result = data as NotebookList;
          result.data = result.data.sort((a: NotebookItem, b: NotebookItem) => a.createdAt < b.createdAt ? 1 : -1);
          result.data.forEach(item => {
            item.friendlyCreatedAt = friendlyDate(item.createdAt);
            item.friendlyUpdateAt = friendlyDate(item.updatedAt);
          });
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addNotebook({title = ''} = {title: ''}) {
    return new Promise((resolve, reject) => {
      request(URL.ADD, 'POST', {title})
        .then(data => {
          const result = data as CreateNotebook;
          result.data!.noteCounts = 0;
          result.data!.friendlyCreatedAt = friendlyDate(result.data!.createdAt);
          result.data!.friendlyUpdateAt = friendlyDate(result.data!.updatedAt);
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateNotebook(notebookId: number, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':notebookId', notebookId.toString()), 'PATCH', {title});
  },
  deleteNotebook(notebookId: number) {
    return request(URL.DELETE.replace(':notebookId', notebookId.toString()), 'DELETE');
  }
};