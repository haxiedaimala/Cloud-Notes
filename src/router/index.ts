import {createRouter, createWebHashHistory} from 'vue-router';
import Test from '../components/test.vue';
import HelloWorld from '../components/HelloWorld.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/test',
      component: Test
    }]
});
export default router;