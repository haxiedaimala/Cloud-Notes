import {createRouter, createWebHashHistory} from 'vue-router';
import Login from '../views/Login.vue';

const NoteBooks = () => import('../views/NotebookList.vue');
const Note = () => import('../views/NoteDetail.vue');
const Trash = () => import('../views/TrashDetail.vue');
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NoteBooks
    },
    {
      path: '/note',
      component: Note
    },
    {
      path: '/trash',
      component: Trash
    }
  ]
});
export default router;