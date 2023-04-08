import {inject, Ref} from 'vue';
import {useRouter} from 'vue-router';

export function validLogin() {
  const router = useRouter();
  const userInfo = inject<Ref<{ username: string }>>('userInfo')!;
  if (userInfo.value.username === '未登录') {
    router.push({path: '/login'});
  }
}
