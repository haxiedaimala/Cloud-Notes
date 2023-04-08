import request from '../helpers/request';

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  UPDATE: '/notebooks/:notebookId',
  DELETE: '/notebooks/:notebookId'
};
export default {
  getAll() {
    return request(URL.GET, 'GET');
  },
  addNotebook({title = ''} = {title: ''}) {
    return request(URL.ADD, 'POST', {title});
  },
  updateNotebook(notebookId: number, {title = ''} = {title: ''}) {
    return request(URL.UPDATE.replace(':notebookId', notebookId.toString()), 'PATCH', {title});
  },
  deleteNotebook(notebookId: number) {
    return request(URL.DELETE.replace(':notebookId', notebookId.toString()), 'DELETE');
  }
};