import request from '../helpers/request';

const URL = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  GET_INFO: '/auth'
};

export default {
  register(userInfo: { username: string, password: string }) {
    return request(URL.REGISTER, 'POST', userInfo);
  },
  login(userInfo: { username: string, password: string }) {
    return request(URL.LOGIN, 'POST', userInfo);
  },
  logout() {
    return request(URL.LOGOUT, 'GET');
  },
  getInfo() {
    return request(URL.GET_INFO, 'GET');
  }
};