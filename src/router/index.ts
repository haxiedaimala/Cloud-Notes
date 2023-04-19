import {createRouter, createWebHashHistory} from 'vue-router';

const Login = () => import('../views/Login.vue');
const NoteBooks = () => import('../views/NotebookList.vue');
const Note = () => import('../views/NoteDetail.vue');
const Trash = () => import('../views/TrashDetail.vue');
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/notebooks'
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