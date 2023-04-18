import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import Auth from '../api/auth';
import {useRouter} from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  //state
  const router = useRouter();
  const user = ref<UserInfo | null>(null);
  //getters
  const username = computed(() => user.value === null ? '未登录' : user.value.username);
  const slug = computed(() => username.value === null ? '未' : username.value.charAt(0));

  //actions
  function checkLogin() {
    if (user.value !== null) return Promise.resolve();
    return Auth.getInfo()
      .then(data => {
        const result = data as LoginInfo;
        if (result.isLogin) {
          user.value = result.data!;
        } else {
          router.push({path: '/login'});
        }
      });
  }

  function logout() {
    return Auth.logout()
      .then(() => {
        user.value = null;
        router.push({path: '/login'});
      });
  }

  function login({username, password}: { username: string, password: string }) {
    return Auth.login({username, password})
      .then(data => {
        user.value = (data as LoginInfo).data!;
      });
  }

  function register({username, password}: { username: string, password: string }) {
    return Auth.register({username, password})
      .then(data => {
        user.value = (data as RegisterInfo).data!;
      });
  }

  return {
    username,
    slug,
    login,
    register,
    checkLogin,
    logout
  };
});